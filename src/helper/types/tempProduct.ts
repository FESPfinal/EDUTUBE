export type TempParentsProduct = {
  mainImages: string[];
  name: string;
  content: string;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number,
  buyQuantity?: number,
  extra: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetimeList:
    {
      date: Date,
      time: Date
    }[];
    author?: string;
    authorImage?: string[];
    type: 'coffeechat' | 'video';
    jobCategory: string[];
    regionCategory?: string;
    productType: 'parents';
  };
}

export type TempChildProduct = {
  mainImages?: [];
  name: string;
  content: string; //datetime
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number,
  buyQuantity?: number,
  extra: {
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetime: {
      date: Date,
      time: Date
    };
    author?: string;
    jobCategory: string[];
    regionCategory?: string;
    parentsId: number,
    productType: 'child';
  };
}