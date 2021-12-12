import queryString from 'query-string';
import axiosClient from './axios-client';

export const Query = {
  channel: {
    list: ({ channelId }: any) => {
      const url = `https://youtube.googleapis.com/youtube/v3/channels?id=${channelId}`;
      const config = {
        params: {
          part: ['snippet,contentDetails,statistics'],
          key: `${process.env.REACT_APP_YOUTUBE_KEY}`,
        },
      };
      return axiosClient.get(url, config);
    },
  },
  video: {
    list: (filter?: any) => {
      const param = queryString.stringify(filter);
      const url = `${process.env.REACT_APP_API_URL}/video?${param}`;
      return axiosClient.get(url);
    },
    item: (videoId: any) => {
      const url = `${process.env.REACT_APP_API_URL}/trending/${videoId}`;
      return axiosClient.get(url);
    },
  },
  trending: {
    list: (filter?: any) => {
      const param = queryString.stringify(filter);
      const url = `${process.env.REACT_APP_API_URL}/trending?${param}`;
      return axiosClient.get(url);
    },
  },
  comment: {
    list: (videoId: string) => {
      const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}`;
      const config = {
        params: {
          part: ['snippet,replies'],
          key: `${process.env.REACT_APP_YOUTUBE_KEY}`,
          maxResults: 20,
        },
      };
      return axiosClient.get(url, config);
    },
  },
};
