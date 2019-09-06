import { fetch } from './fetch';

interface VideoInfo {
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  lengthSeconds: number;
  liveNow: boolean;
  isUpcoming: boolean;
}

const getUrl = (id: string) => `https://invidio.us/api/v1/videos/${id}`;

export const fetchInfo = async (id: string) => {
  const response = await fetch(getUrl(id));
  const data: VideoInfo = JSON.parse(response);
  return data;
};

