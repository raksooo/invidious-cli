import React, { useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { FetcherContext, FetcherContextValue } from './Fetcher';
import { VideoData } from '../helpers/fetchFeed';
import {ConfigContext, ConfigUpdaterContext, ConfigUpdater} from './App';
import {Config} from '../config';
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
  const { player, last } = useContext<Config>(ConfigContext);
  const { setLast } = useContext<ConfigUpdater>(ConfigUpdaterContext);
  const { feed, refetch } = useContext<FetcherContextValue>(FetcherContext);
  const items = useMemo<FeedRow[]>(() => feed.map(item => new FeedRow(item)), [feed]);
  const getRows = useCallback((items: FeedRow[]) => items.map(item => item.toString()), [items])
  const [rows, setRows] = useState<string[]>(() => getRows(items));
  const [index, setIndex] = useState<number>(0);

  const updateSelection = useCallback(() => {
    items.forEach(item => { item.selected = item.date.getTime() > last.getTime(); });
    setRows(getRows(items));
  }, [items, last]);

  const onSelectItem = useCallback((_, i) => setIndex(i), []);

  const onKey = useCallback(key => {
    const actions = {
      ' ': () => {
        items[index].toggleSelection();
        setRows(getRows(items));
      },
      'n': () => setLast(new Date()),
      'r': () => refetch(),
      'o': () => playVideos(player, [items[index]]),
      'p': () => {
        const selected = items.filter(item => item.selected);
        const dates = selected.map(item => item.date.getTime());
        setLast(new Date(Math.max(...dates)));
        playVideos(player, selected);
      },
    };
    Object.keys(actions).includes(key) && actions[key]();
  }, [index, items, setLast]);

  useEffect(() => { updateSelection(); }, [last, feed]);

  return (
    <list
      onSelectItem={onSelectItem}
      onKeypress={onKey}
      items={rows}
      style={{ selected: { fg: 'green' }}}
      keys
      vi
      focused />
  );
};

export default React.memo(Feed);

