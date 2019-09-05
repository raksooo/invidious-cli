import program from 'commander';
import run from './setup';
import { readConfig, savePlayer, saveFeed, Config } from './config';
import {config} from 'process';

let setProvided = false;

program
  .version('0.0.1')
  .option('-p, --player <player>', 'Player to use when playing videos');

program
  .command('set <option> <value>')
  .usage('set <key> <value>, where key is "player" or "feed"')
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
      if (setupComplete(config)) {
        run(config);
      }
    });
}

const setupComplete = (config: Config) => {
  if (!config.player) {
    console.log('No player configured.');
  }
  if (!config.feed) {
    console.log('No feed configured.');
  }

  return config.player && config.feed;
};

