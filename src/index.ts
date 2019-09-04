import program from 'commander';
import run from './setup';
import { readConfig, savePlayer, saveFeed } from './config';

let setProvided = false;

program
  .version('0.0.1')
  .option('-p, --player <player>', 'Player to use when playing videos');

program
  .command('set <option> <value>')
  .usage('set player <command>')
  .usage('set feed <url>')
  .action((option, value) => {
    setProvided = true;
    option == 'player' && savePlayer(value);
    option == 'feed' && saveFeed(value);
  });

program
  .parse(process.argv)

if (!setProvided) {
  readConfig()
    .then(config => {
      config.player = program.args[0] || config.player;
      run(config);
    });
}

