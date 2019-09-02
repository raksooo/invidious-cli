import https from 'https';
import { parseStringPromise } from 'xml2js';

export const fetch: (url: string) => Promise<string> = url => {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
    }).on("error", error => reject(error));
  });
};

export const getFeed: (url: string) => Promise<object> = async (url) => {
  const xml = await fetch(url);
  return await parseStringPromise(xml);
};

