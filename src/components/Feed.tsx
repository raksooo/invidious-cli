import React, {useContext} from 'react';
import {FetcherContext} from './Fetcher';

const Feed: React.FC = () => {
  const feed = useContext(FetcherContext);

  return (
    <>
      {JSON.stringify(feed)}
    </>
  );
};

export default React.memo(Feed);

