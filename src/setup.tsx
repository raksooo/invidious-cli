import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import { Config } from './config';
import App from './components/App';

const options = {
  title: 'Termtube',
  autoPadding: true,
  smartCSR: true,
};

export default (config: Config) => {
  const screen = blessed.screen(options);
  screen.key(['q', 'C-c'], () => process.exit(0));
  render(<App config={config} />, screen);
}

