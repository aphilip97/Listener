type Track = {
  timestamp: string;
  name: string;
};

export type ExtensionsToMimeTypesMap = {
  webm: "audio/webm";
  m4a: "audio/x-m4a";
}

type Extension = keyof ExtensionsToMimeTypesMap;

export type MimeType = {
  [K in keyof ExtensionsToMimeTypesMap]: ExtensionsToMimeTypesMap[K]
}[keyof ExtensionsToMimeTypesMap]

// The file extension is .listen hence the name Listen :)
export type Listen = {
  title: string;
  src: string;
  ext: Extension;
  tracklist: Track[];
};

export type ListenMessage = Listen & {
  message: "Loaded-Audio-Info";
};
