export const extractVideoId = (url: string) => {
  const urlObject = new URL(url);
  const searchParams = new URLSearchParams(urlObject.search);
  return searchParams.get('v');
};
