import { program } from 'commander';
import { prisma } from '../src/database/clients/games.client';
import * as dotenv from 'dotenv'
import { IgdbClient } from '../src/queries/igdb_client';
dotenv.config()

program
  .option('-g, --games_number <number>', 'number of games to fetch from igdb')
  .option('-d, --debug', 'output extra debugging')
  .option('-c, --client_id <id>', 'igdb client id')
  .option('-s, --client_secret <secret>', 'igdb client secret')
  .option('-o, --offset <offset>', 'igdb offset')
  .option('-co, --concurrency <number>', 'concurrency limit');
program.parse(process.argv);

const options = program.opts();
const debug = options.debug || false
const games_number = options.games_number || 250000
const clientId = options.client_id || process.env.IGDB_CLIENT_ID
const clientSecret = options.client_secret || process.env.IGDB_CLIENT_SECRET
const concurrencyLimit = options.concurrency || 50

let offset = options.offset || 0;
let currentConcurrency = 0;

async function processGames(offset: number) {
  console.log("Processing igdb game offset:", offset);
  try {
    const games = await client.get_games(offset);
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
    processGames(offset);
    offset += 500;
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
