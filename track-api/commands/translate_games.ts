import { Option, program } from 'commander';
import * as dotenv from 'dotenv'
import { getGamesInDb, updateGame } from '../src/database/clients/games.client';
import { Games } from '@prisma/client';
import translateText from '../src/utils/translate';
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';


dotenv.config()

program
  .addOption(new Option('-l, --language <string>', 'language destination').argParser(String))

program.parse(process.argv);

async function getAllGames() {
  let offset = 0;
  const limit = 32767;
  const games: Games[] = []

  console.log("Fetching games...")
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await getGamesInDb("", offset, limit);
    if (!res) {
      break;
    }
    console.log(`Games ${offset} to ${offset + limit} fetched...`)
    for (let index = 0; index < res.games.length; index++) {
      console.log(`Fetching game ${index + 1} with translation...`)
      const element = res.games[index];
      if (!element.description) {
        continue;
      }
      const translatedText = await translateText(element.description, "en", "fr")
      if (translatedText) {
        res.games[index].description = translatedText
      }
      
    }
    games.push(...res.games)
    if (!res.hasNextPage) {
      break;
    }
    offset += limit;
    console.log(`Fetched ${games.length} games...`)
  }
  return games;
}

async function updateDescription(game: Games) {
  try {
    await updateGame(game)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

function main() {
  console.log("Translate games description...")
  getAllGames().then(async (games: Games[]) => {
    const translatedGamesBar = new cliProgress.SingleBar({
      clearOnComplete: false,
      hideCursor: true,
      format: '{name} |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} {text}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      stopOnComplete: false,
    }, cliProgress.Presets.shades_grey);
    console.log(`Found ${games.length} games to translate`)
    translatedGamesBar.start(games.length, 0, {name: 'Update games description', text: 'games'});
    for (let index = 0; index < games.length; index++) {
      const element = games[index];
      await updateDescription(element)
      translatedGamesBar.update(index + 1)
    }
    translatedGamesBar.stop();
    console.log("Translate games description done !")
  }
  ).catch((err) => {
    console.error(err);
  })
}

main();
