type Track = {
  timestamp: string;
  name: string;
};

// The file extension is .listen hence the name Listen :)
export type Listen = {
  title: string;
  src: string;
  tracklist: Track[];
};

export type ListenMessage = Listen & {
  message: "Loaded-Audio-Info";
};
