import { ChildProcess, spawn } from 'child_process';
import { VideoData } from './fetchFeed';

let playerProcess: ChildProcess;

export const playVideos = (
  player: string,
  videos: VideoData[],
  outputCallback: (output: string) => void
) => {
  const links = videos.map(video => video.link);

  const callback = (output: any) => {
    const data = output.toString().trim();
    return data !== '' && outputCallback(data);
  };

  playerProcess = spawn(player, links);
  playerProcess.stdout.on('data', callback);
  playerProcess.stderr.on('data', callback);
  playerProcess.on('close', () => playerProcess = null);
};

