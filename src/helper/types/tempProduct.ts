export type TempParentsProduct = {
  mainImages?: [];
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
    place: 'online' | 'offline';
    online: string;
    offline: string;
    datetime: any;
    person?: string;
    userData?: string;
    maxParticipants?: number;
    type?: 'coffeechat' | 'video';
    jobCategory: string;
    regionCategory?: string;
    productType: 'parents';
  };
}

export type TempChildProduct = {
  mainImages?: [];
  name: string;
  content: any; //datetime
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number,
  buyQuantity?: number,
  extra: {
    parentsId: number,
    productType: 'child';
  };
}