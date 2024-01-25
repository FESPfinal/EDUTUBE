export type ExtraVideoItem = {
  _id: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: string;
  channelTitle: string;
  link: string;
};

export type VideoItem = {
  _id: number;
  price: number;
  shippingFees: number;
  quantity: number;
  buyQuantity: number;
  show: boolean;
  active: boolean;
  name: string;
  content: string;
  mainImages: {
    originalname: string;
    name: string;
    path: string;
  }[];
  extra: {
    type: 'video';
    author: string;
    category: string[];
    videoList: ExtraVideoItem[];
  };
  seller_id: number;
  createdAt: string;
  updatedAt: string;
  replies: number;
  bookmarks: number;
};

export type VideoList = VideoItem[];
