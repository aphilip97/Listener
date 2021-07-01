import path from 'path';
import { Listen } from '../../types/index';

const src = path.join(
  __dirname,
  'assets',
  'royalty_free_mixtape.mp3'
);

const listenFile: Listen = {
  title: 'Royalty Free Mixtape For Testing.',
  src: `file://wsl%24/Ubuntu-20.04${src}`,
  ext: 'mp3',
  tracklist: [
    {
      name: 'Summer Tropical Pop',
      timestamp: '00:00',
    },
    {
      name: 'Smooth Funk',
      timestamp: '05:45',
    },
    {
      name: 'Sunday',
      timestamp: '06:33',
    },
  ],
};

export default listenFile;

