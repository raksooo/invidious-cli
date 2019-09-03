import React, { useContext, useMemo } from 'react';
import { FetcherContext } from './Fetcher';
import { VideoData } from '../helpers/fetchFeed';

class FeedRow implements VideoData {
  public title: string;
  public link: string;
  public author: string;
  public date: Date;

  public selected: boolean = false;

  constructor(data: VideoData) {
    this.title = data.title;
    this.link = data.link;
    this.author = data.author;
    this.date = data.date;
  }

  public toString() {
    const check = this.selected ? '✔' : ' ';
    return ` ${check} ${this.author} - ${this.title}`;
  }
}

const Feed: React.FC = () => {
  const feed = useContext<VideoData[]>(FetcherContext);
  const items = useMemo(() => feed.map(item => new FeedRow(item)), [feed]);
  const rows = items.map(item => item.toString());

  return (
    <list
      items={rows}
      style={{ selected: { fg: 'green' }}}
      keys
      vi
      focused/>
  );
};

export default React.memo(Feed);

