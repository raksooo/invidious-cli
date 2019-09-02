import program from 'commander';
import run from './setup';

program
  .version('0.0.1');

program
  .command('set')
  .option('-s, --subscriptions <url>', 'URL for subscription rss feed')
  .option('-p, --player <player>', 'Player to use when playing videos')
  .action(({ subscriptions, player }) => {
    console.log('a');
  });

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  run();
}

