import https from 'https';

export const fetch: (url: string) => Promise<string> = url => {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
    }).on("error", error => reject(error));
  });
};

