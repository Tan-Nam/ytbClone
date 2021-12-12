export type responseVideo = {
  kind: string;
  etag: string;
  id: string;
  snippet: snippet;
  contentDetails: any;
  statistics?: any;
};

type snipptKey =
  | 'publishedAt'
  | 'channelId'
  | 'title'
  | 'description'
  | 'thumbnails'
  | 'channelTitle'
  | 'categoryId'
  | 'liveBroadcastContent'
  | 'localized'
  | 'defaultAudioLanguage';

type snippet = {
  [key in snipptKey]: any;
};
