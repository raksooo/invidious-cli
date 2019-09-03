import React, { useContext, useMemo, useState, useCallback } from 'react';
import { FetcherContext } from './Fetcher';
import { VideoData } from '../helpers/fetchFeed';
import {ConfigContext} from './App';
import {Config, saveLast} from '../config';
import {playVideos} from '../helpers/player';

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

  public toggleSelection() {
    this.selected = !this.selected;
  }

  public toString() {
    const check = this.selected ? '✔' : ' ';
    return ` ${check} ${this.author} - ${this.title}`;
  }
}

const Feed: React.FC = () => {
  const { player } = useContext<Config>(ConfigContext);
  const feed = useContext<VideoData[]>(FetcherContext);
  const items = useMemo<FeedRow[]>(() => feed.map(item => new FeedRow(item)), [feed]);
  const getRows = useCallback((items: FeedRow[]) => items.map(item => item.toString()), [items])
  const [rows, setRows] = useState(() => getRows(items));
  const [index, setIndex] = useState(0);

  const onSelectItem = useCallback((_, i) => setIndex(i), []);
  const onKey = useCallback(key => {
    const actions = {
      ' ': () => items[index].toggleSelection(),
      'n': () => saveLast(new Date()),
      'o': () => playVideos(player, [items[index]]),
      'p': () => {
        const selected = items.filter(item => item.selected);
        const dates = selected.map(item => item.date.getTime());
        saveLast(new Date(Math.max(...dates)));
        playVideos(player, selected);
      },
    };
    Object.keys(actions).includes(key) && actions[key]();
    setRows(getRows(items));
  }, [index, items]);

  return (
    <list
      onSelectItem={onSelectItem}
      onKeypress={onKey}
      items={rows}
      style={{ selected: { fg: 'green' }}}
      keys
      vi
      focused/>
  );
};

export default React.memo(Feed);

