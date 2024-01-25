export type Thumbnails = {
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high: {
    url: string;
    width: number;
    height: number;
  };
  standard?: {
    url: string;
    width: number;
    height: number;
  };
  maxres?: {
    url: string;
    width: number;
    height: number;
  };
};

export type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags?: string[];
  categoryId?: string;
  liveBroadcastContent: string;
  defaultLanguage?: string;
  localized?: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
  publishTime?: string;
};

export type YoutubeItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
};

export type YoutubeResponse = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeItem[];
};
