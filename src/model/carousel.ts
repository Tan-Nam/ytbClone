type snippet = {
  thumbnails: {
    standard: {
      url: string;
    };
    maxres: {
      url: string;
    };
  };
};

export type ImageSlider = {
  image: Array<{
    kind?: string;
    etag?: string;
    id?: string;
    snippet: snippet;
  }>;
};
