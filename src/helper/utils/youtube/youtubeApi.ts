import { YoutubeResponse } from '@/helper/types/youtube';
import axios from 'axios';

const KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const URL = (videoId: string) =>
  `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${KEY}`;

const youtubeApi = async (videoId: string): Promise<YoutubeResponse> => {
  try {
    const response = await axios.get<YoutubeResponse>(URL(videoId));

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw new Error('[ERROR] Youtube API 요청 불가.');
  }
};

export default youtubeApi;
