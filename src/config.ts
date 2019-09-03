import os from 'os';
import path from 'path';
import fs, { access, readFile, writeFile } from 'fs';
import { promisify } from 'util';

const accessAsync = promisify(access);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const CONFIG_NAME = 'invidious-cli';
const CONFIG_PATH = path.join(os.homedir(), '.config', CONFIG_NAME);

const CONFIG_KEY_PLAYER = "player";
const CONFIG_KEY_FEED = "feed";
const CONFIG_KEY_LAST = "last";

export interface Config {
  [CONFIG_KEY_PLAYER]?: string;
  [CONFIG_KEY_FEED]?: string;
  [CONFIG_KEY_LAST]?: Date;
}

const ensureConfig: () => Promise<void> = async () => {
  try {
    await accessAsync(CONFIG_PATH, fs.constants.F_OK);
  } catch (e) {
    writeConfig({});
  }
};

export const readConfig: () => Promise<Config> = async () => {
  await ensureConfig();
  const config = await readFileAsync(CONFIG_PATH);
  const json = JSON.parse(config.toString());
  return {
    [CONFIG_KEY_PLAYER]: json[CONFIG_KEY_PLAYER],
    [CONFIG_KEY_FEED]: json[CONFIG_KEY_FEED],
    [CONFIG_KEY_LAST]: new Date(json[CONFIG_KEY_LAST]),
  };
};

const writeConfig = (config: Config) => {
  const json = JSON.stringify(config);
  return writeFileAsync(CONFIG_PATH, json);
};

const editConfig = async (patch: Config) => {
  const config = await readConfig();
  const newConfig = Object.assign(config, patch);
  return await writeConfig(newConfig);
};

export const savePlayer = (player: string) => {
  return editConfig({ [CONFIG_KEY_PLAYER]: player });
};

export const saveFeed = (url: string) => {
  return editConfig({ [CONFIG_KEY_FEED]: url });
};

export const saveLast = (last: Date) => {
  return editConfig({ [CONFIG_KEY_LAST]: last });
};

