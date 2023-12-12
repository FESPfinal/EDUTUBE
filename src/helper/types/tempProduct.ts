export type TempParentsProduct = {
  mainImages: string[];
  name: string;
  content: string;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number;
  buyQuantity: number;
  extra: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetimeList: {
      date: Date;
      time: Date;
    }[];
    author: string;
    authorImage?: string;
    type: 'coffeechat' | 'video';
    jobCategory: string[];
    regionCategory?: string;
    productType: 'parents';
    depth: number;
  };
};

export type TempChildProduct = {
  mainImages?: string[];
  name: string;
  content: string; //datetime
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number;
  buyQuantity: number;
  extra: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetime: {
      date: Date;
      time: Date;
    };
    author: string;
    type: 'coffeechat' | 'video';
    jobCategory: string[];
    regionCategory?: string;
    productType: 'child';
    depth: number;
    parent: number;
  };
};
