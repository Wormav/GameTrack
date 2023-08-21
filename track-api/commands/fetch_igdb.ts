import { Option, program } from 'commander';
import * as dotenv from 'dotenv'
import { IResponseGame, IgdbClient } from '../src/queries/igdb_client';
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

dotenv.config()

program
  .addOption(new Option('-g, --games-number <number>', 'number of games to fetch from igdb').argParser(parseInt))
  .addOption(new Option('-d, --debug', 'output extra debugging'))
  .addOption(new Option('-c, --client_id <string>', 'igdb client id'))
  .addOption(new Option('-s, --client_secret <secret>', 'igdb client secret'))
  .addOption(new Option('-o, --offset <offset>', 'igdb offset').argParser(parseInt))
  .addOption(new Option('-co, --concurrency <number>', 'concurrency limit').argParser(parseInt))

program.parse(process.argv);

const options = program.opts();
const debug = options.debug as boolean;
const games_number = (options.gamesNumber || 250000) as number;
const clientId = (options.clientId || process.env.IGDB_CLIENT_ID) as string;
const clientSecret = (options.clientSecret || process.env.IGDB_CLIENT_SECRET) as string;
const concurrencyLimit = (options.concurrency || 50) as number;
let offset = (options.offset || 0) as number;

const client = new IgdbClient(clientId, clientSecret);
let currentConcurrency = 0;
const limit = games_number < 500 ? games_number : 500;
const gamesToAdd:IResponseGame[] = [];

const concurrencyBar = new cliProgress.SingleBar({
  clearOnComplete: false,
  hideCursor: true,
  format: '{name} |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} {text}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  stopOnComplete: false,
}, cliProgress.Presets.shades_grey);

concurrencyBar.start(games_number / limit < concurrencyLimit ? games_number / limit : concurrencyLimit, 0, {name: 'Concurrency', text: 'active tasks'});

async function processGames(offset_bis: number) {
  try {
    const games = await client.get_games(offset_bis, limit);
    if (games?.length === 0) {
      return;
    }
    gamesToAdd.push(...games);
  } catch (error) {
    console.error("Error processing igdb games:", error);
    process.exit(1);
  } finally {
    currentConcurrency--;
    concurrencyBar.update(currentConcurrency)
    if (offset_bis < games_number) {
      void processNextOffset();
    } else {
      console.log("No more games to process");
      if (currentConcurrency === 0) {
        concurrencyBar.stop();
        console.log(`starting to add ${gamesToAdd.length} games to the database`);
        await IgdbClient.add_games_to_db(gamesToAdd);
        console.log("Finished adding games to the database");
        process.exit(0);
      }
    }
  }
}

async function processNextOffset() {

  while (offset < games_number && currentConcurrency < concurrencyLimit) {
    currentConcurrency++;
    concurrencyBar.update(currentConcurrency)
    void processGames(offset);
    offset += limit;
  }
  if (offset >= games_number && currentConcurrency === 0) {
    concurrencyBar.stop();
    console.log(`starting to add ${gamesToAdd.length} games to the database`);
    await IgdbClient.add_games_to_db(gamesToAdd);
    console.log("Finished adding games to the database");
    process.exit(0);
  }
}

const main = () => {
  if (debug) {
    console.log("Games number:", games_number);
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret);
    console.log("Offset:", offset);
    console.log("Concurrency limit:", concurrencyLimit);
  }
  
  void processNextOffset();
}

main();
