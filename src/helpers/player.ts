import { ChildProcess, spawn } from 'child_process';
import { VideoData } from './fetchFeed';

let playerProcess: ChildProcess;

export const playVideos = (player: string, videos: VideoData[]) => {
  const links = videos.map(video => video.link);

  playerProcess = spawn(player, links);
  playerProcess.stdout.on('data', () => {});
  playerProcess.stderr.on('data', () => {});
  playerProcess.on('close', () => playerProcess = null);
};

