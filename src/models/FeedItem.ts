import { VideoData } from '../helpers/fetchFeed';

export class FeedItem implements VideoData {
  private readonly data: VideoData;

  public readonly title: string;
  public readonly link: string;
  public readonly author: string;
  public readonly date: Date;

  public readonly selected: boolean;

  constructor(data: VideoData, selected: boolean = false) {
    this.data = data;
    this.title = data.title;
    this.link = data.link;
    this.author = data.author;
    this.date = data.date;
    this.selected = selected;
  }

  public toggleSelected() {
    return new FeedItem(this.data, !this.selected);
  }

  public selectedIfMoreRecent(date: Date) {
    return new FeedItem(this.data, this.data.date > date);
  }

  public toString() {
    const check = this.selected ? '✔' : ' ';
    return ` ${check} ${this.author} - ${this.title}`;
  }
}
