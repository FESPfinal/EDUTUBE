export interface tempProductType {
  mainImages?: string[];
  name: string;
  content: string;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  quantity: number,
  buyQuantity?: number,
  extra: {
    category?: string;
    intro: string;
    place: string;
    online: string;
    offline: string;
    datetime?: any;
    person?: string;
    userData?: string;
    maxParticipants?: number
  };
}
