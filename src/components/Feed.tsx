import React, { useContext, useState, useCallback, useEffect } from 'react';
import clipboardy from 'clipboardy';
import { FetcherContext } from './Fetcher';
import { ConfigContext } from './App';
import { playVideos } from '../helpers/player';
import { FeedData } from '../models/FeedData';
import InfoLine from './InfoLine';
import { useToggle } from '../helpers/toggleHook';
import InfoDialog from './InfoDialog';

const Feed: React.FC = () => {
  const { player, last, setLast } = useContext(ConfigContext);
  const { data: videos, refetch } = useContext(FetcherContext);
  const [feed, setFeed] = useState(() => FeedData.fromVideoData(videos));
  const [showInfo, toggleShowInfo] = useToggle();
  const [output, setOutput] = useState<string>(null);

  const actions = {
    ' ': () => setFeed(feed.select()),
    'n': () => updateLast(new Date()),
    'r': () => refetch(),
    'i': () => toggleShowInfo(),
    'y': () => clipboardy.writeSync(feed.current.link),
    'o': () => playVideos(player, [feed.current], setOutput),
    'p': () => {
      updateLast(feed.lastDateOfSelected);
      playVideos(player, feed.selected.reverse(), setOutput);
    },
  };

  const onSelectItem = useCallback((_, i) => setFeed(feed.setIndex(i)), [feed]);
  const updateLast = useCallback(date => {
    setLast(new Date(Math.max(date.getTime(), last.getTime())));
  }, [last, setLast]);
  const onKey = useCallback(key => actions[key] && actions[key](), [feed, updateLast]);

  useEffect(() => { setFeed(feed => feed.selectMoreRecent(last)); }, [last]);

  return (
    <element>
      {showInfo && (<InfoDialog video={feed.current} />)}
      <list
        onSelectItem={onSelectItem}
        onKeypress={onKey}
        items={feed.strings}
        height="100%-1"
        style={{ selected: { fg: 'green' }}}
        keys
        vi
        focused />
      <InfoLine text={output} />
    </element>
  );
};

export default React.memo(Feed);

