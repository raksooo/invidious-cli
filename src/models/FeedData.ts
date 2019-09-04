import {FeedItem} from './FeedItem';
import {VideoData} from '../helpers/fetchFeed';

export class FeedData {
  public readonly data: FeedItem[];
  public index: number;

  constructor(data: FeedItem[], index: number = 0) {
    this.data = data;
    this.index = index;
  }

  public static fromVideoData(data: VideoData[]) {
    return new FeedData(data.map(item => new FeedItem(item)));
  }

  public setIndex(index: number) {
    this.index = index;
  }

  public select() {
    const data = [
      ...this.data.slice(0, this.index),
      this.data[this.index].toggleSelected(),
      ...this.data.slice(this.index + 1),
    ];
    return new FeedData(data, this.index);
  }

  public get strings() {
    return this.data.map(item => item.toString());
  }

  public get current() {
    return this.data[this.index];
  }

  public get selected() {
    return this.data.filter(item => item.selected);
  }

  public get lastDateOfSelected() {
    const dates = this.selected.map(item => item.date.getTime());
    return new Date(Math.max(...dates));
  }

  public selectMoreRecent(date: Date) {
    const items = this.data.map(item => item.selectedIfMoreRecent(date));
    return new FeedData(items, this.index);
  }
}

