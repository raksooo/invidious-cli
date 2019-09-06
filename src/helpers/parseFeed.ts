import { VideoData } from './fetchFeed';

interface InvidiousData {
  feed: {
    entry: Array<{
      'yt:videoId': string[];
      title: string[];
      link: Array<{
        '$': {
          href: string;
        };
      }>;
      author: Array<{
        name: string[];
      }>;
      published: string[];
    }>;
  };
}

export const parseFeed: (data: InvidiousData) => VideoData[] = (data) => (
  data.feed.entry.map(item => ({
    id: item['yt:videoId'][0],
    title: item.title[0],
    link: item.link[0]['$'].href,
    author: item.author[0].name[0],
    date: new Date(item.published[0]),
  }))
);

