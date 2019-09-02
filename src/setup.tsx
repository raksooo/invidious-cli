import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import App from './components/App';

const options = {
  title: 'Termtube',
  autoPadding: true,
  smartCSR: true,
};

export default () => {
  const screen = blessed.screen(options);
  screen.key(['q', 'C-c'], () => process.exit(0));
  render(<App />, screen);
}

