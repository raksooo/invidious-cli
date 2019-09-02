import React, { useContext } from 'react';
import { FetcherContext } from './Fetcher';
import { VideoData } from '../helpers/fetch';

const Feed: React.FC = () => {
  const feed = useContext<VideoData[]>(FetcherContext);
  const items = feed.map(item => item.title[0])

  return (
    <list
      items={items}
      style={{ selected: { fg: 'green' }}}
      keys
      vi />
  );
};

export default React.memo(Feed);

