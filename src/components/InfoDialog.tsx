import React, { useCallback, useContext, useMemo } from 'react';
import dateDifference from 'date-difference';
import { fetchInfo } from '../helpers/fetchInfo';
import Fetcher, {FetcherContext} from './Fetcher';
import Loading from './Loading';
import {VideoData} from '../helpers/fetchFeed';

interface InfoDialogProps {
  video: VideoData;
}

const InfoDialog: React.FC<InfoDialogProps> = (props) => {
  const {
    video,
  } = props;

  const fetch = useCallback(() => fetchInfo(video.id), [video.id]);

  return (
    <box top="center"
         left="center"
         width={70}
         height={10}
         border={{type: 'line'}}
         style={{border: {fg: 'yellow'}}}>
      <Fetcher fetch={fetch} fallback={<Loading noTime />}>
        <_InfoDialog video={video} />
      </Fetcher>
    </box>
  );
}

export default React.memo(InfoDialog);

const _InfoDialog: React.FC<InfoDialogProps> = (props) => {
  const {
    video,
  } = props;

  const { data: info } = useContext(FetcherContext);

  const createDuration = useCallback(value => {
    const date = new Date(null);
    date.setSeconds(value);
    return date.toISOString().substr(11, 8);
  }, []);

  const createDate = useCallback(value => {
    const date = new Date(value);
    const diff = dateDifference(date, new Date(), { compact: true });
    const dateString = date
      .toISOString()
      .substr(0, 19)
      .replace('T', ' ');
    return `${diff} (${dateString})`;
  }, [])

  const items = useMemo(() => {
    const data = [
      ['title', video.title],
      ['author', video.author],
      ['date', createDate(video.date)],
      ['duration', createDuration(info.lengthSeconds)],
      ['views', info.viewCount],
      ['likes', info.likeCount],
      ['dislikes', info.dislikeCount],
      ['url', video.link],
    ];

    const length = Math.max(...data.map(item => item[0].length));
    return data.map(item => {
      const key = ' '.repeat(length - item[0].length) + item[0];
      return `${key}: ${item[1]}`;
    });
  }, [video, info]);

  return (
    <list items={items} />
  );
}

