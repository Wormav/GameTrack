import { Option, program } from 'commander';
import * as dotenv from 'dotenv'
import { deleteGame } from '../src/database/clients/games.client';

dotenv.config()

program
  .addOption(new Option('-i, --id <number>', 'id of the game').argParser(parseInt))
  .addOption(new Option('-n, --name <string>', 'name of the game').argParser(String))

program.parse(process.argv);

const options = program.opts();
const id = options.id as number;
const name = options.name as string;

if (!id && !name) {
  console.error("You must provide either an id or a name");
  process.exit(1);
}

function main() {
  deleteGame(id, name)
    .then((title: string) => {
      console.log(`Game ${title} deleted`);
    }
    )
    .catch((err) => {
      console.error(err);
    } )
}

main();
