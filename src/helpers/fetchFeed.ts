import { parseStringPromise } from 'xml2js';
import { parseFeed } from './parseFeed';
import { fetch } from './fetch';

export interface VideoData {
  id: string;
  title: string;
  link: string;
  author: string;
  date: Date;
}

export const getFeed: (url: string) => Promise<VideoData[]> = async (url) => {
  const xml = await fetch(url);
  const json = await parseStringPromise(xml);
  return parseFeed(json);
};

