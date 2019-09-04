import https from 'https';
import { parseStringPromise } from 'xml2js';
import { parseFeed } from './parseFeed';

export interface VideoData {
  title: string;
  link: string;
  author: string;
  date: Date;
}

export const fetch: (url: string) => Promise<string> = url => {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
    }).on("error", error => reject(error));
  });
};

export const getFeed: (url: string) => Promise<VideoData[]> = async (url) => {
  const xml = await fetch(url);
  const json = await parseStringPromise(xml);
  return parseFeed(json);
};

