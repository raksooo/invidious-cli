import React, { useContext, useState, useCallback, useEffect } from 'react';
import clipboardy from 'clipboardy';
import { FetcherContext} from './Fetcher';
import {ConfigContext} from './App';
import {playVideos} from '../helpers/player';
import {FeedData} from '../models/FeedData';

const Feed: React.FC = () => {
  const { player, last, setLast } = useContext(ConfigContext);
  const { videos, refetch } = useContext(FetcherContext);
  const [feed, setFeed] = useState(() => FeedData.fromVideoData(videos));

  const onSelectItem = useCallback((_, i) => feed.setIndex(i), [feed]);
  const updateLast = useCallback(date => date > last && setLast(date), [last, setLast]);

  const onKey = useCallback(key => {
    const actions = {
      ' ': () => setFeed(feed.select()),
      'n': () => updateLast(new Date()),
      'r': () => refetch(),
      'y': () => clipboardy.writeSync(feed.current.link),
      'o': () => playVideos(player, [feed.current]),
      'p': () => {
        updateLast(feed.lastDateOfSelected);
        playVideos(player, feed.selected);
      },
    };
    Object.keys(actions).includes(key) && actions[key]();
  }, [feed, updateLast]);

  useEffect(() => { setFeed(feed.selectMoreRecent(last)); }, [last]);

  return (
    <list
      onSelectItem={onSelectItem}
      onKeypress={onKey}
      items={feed.strings}
      style={{ selected: { fg: 'green' }}}
      keys
      vi
      focused />
  );
};

export default React.memo(Feed);

