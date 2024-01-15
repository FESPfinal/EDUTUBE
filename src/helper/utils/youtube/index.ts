import youtubeApi from './youtubeApi';

export const extractVideoId = (url: string) => {
  const urlObject = new URL(url);
  const searchParams = new URLSearchParams(urlObject.search);
  return searchParams.get('v');
};

export const makeVideoSnippet = async (videoId: string, videoUrl: string) => {
  const snippet = await youtubeApi(videoId);
  return {
    _id: snippet.items[0].id,
    channelId: snippet.items[0].snippet.channelId,
    title: snippet.items[0].snippet.localized?.title || snippet.items[0].snippet.title,
    description:
      snippet.items[0].snippet.localized?.description || snippet.items[0].snippet.description,
    thumbnails: snippet.items[0].snippet.thumbnails.high.url,
    channelTitle: snippet.items[0].snippet.channelTitle,
    link: videoUrl,
  };
};
