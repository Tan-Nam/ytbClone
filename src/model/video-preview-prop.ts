import { responseVideo } from './video';
export type videoPreviewProp = {
  video: responseVideo;
  pathname: string;
  videoId: string;
  horizontal?: boolean;
  expanded?: boolean;
  detailPreview?: boolean;
};
