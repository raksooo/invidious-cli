import https from 'https';
import { parseStringPromise } from 'xml2js';

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
  return formatFeedData(json);
};

const formatFeedData: (data: object) => VideoData[] = (data) => (
  data.feed.entry.map(item => ({
    title: item.title[0],
    link: item.link[0]['$'].href,
    author: item.author[0].name[0],
    date: new Date(item.published[0]),
  }))
);

