import { Option, program } from 'commander';
import * as dotenv from 'dotenv'
import { IgdbClient } from '../src/queries/igdb_client';
dotenv.config()

program
  .addOption(new Option('-g, --games-number <number>', 'number of games to fetch from igdb').argParser(parseInt))
  .addOption(new Option('-d, --debug', 'output extra debugging').default(false))
  .addOption(new Option('-c, --client_id <string>', 'igdb client id'))
  .addOption(new Option('-s, --client_secret <secret>', 'igdb client secret'))
  .addOption(new Option('-o, --offset <offset>', 'igdb offset').argParser(parseInt))
  .addOption(new Option('-co, --concurrency <number>', 'concurrency limit').argParser(parseInt))

program.parse(process.argv);

const options = program.opts();
const debug: boolean = options.debug as boolean || false
const games_number: number = options.gamesNumber as number || 250000
const clientId = (options.clientId  || process.env.IGDB_CLIENT_ID) as string
const clientSecret = (options.clientSecret || process.env.IGDB_CLIENT_SECRET) as string
const concurrencyLimit = options.concurrency as number || 50

let offset = options.offset as number || 0;
let currentConcurrency = 0;
const limit = games_number < 500 ? games_number : 500

async function processGames(offset: number) {
  console.log("Processing igdb game offset:", offset);
  try {
    const games = await client.get_games(offset, limit);
    console.log("Got games from igdb offset:", games.length);
    if (games?.length === 0) {
      console.log("No more games to process");
      process.exit(0);
    }
  } catch (error) {
    console.error("Error processing igdb games:", error);
    process.exit(1);
  } finally {
    currentConcurrency--;
    console.log("Current concurrency:", currentConcurrency);
    if (offset < games_number) {
      console.log("Processing next offset")
      processNextOffset();
    }
    else {
      console.log("No more games to process");
      process.exit(0);
    }
  }
}

function processNextOffset() {
  console.log("Processing next offset");
  while (offset < games_number && currentConcurrency < concurrencyLimit) {
    currentConcurrency++;
    console.log("Current concurrency:", currentConcurrency);
    void processGames(offset)
    offset += limit;
  }
}

if (debug) {
  console.log("Starting igdb game processing...");
  console.log("Games number:", games_number);
  console.log("Client ID:", clientId);
  console.log("Client Secret:", clientSecret);
  console.log("Offset:", offset);
  console.log("Concurrency limit:", concurrencyLimit);
}


const client = new IgdbClient(clientId, clientSecret);
processNextOffset();
console.log("Finished igdb game processing");
