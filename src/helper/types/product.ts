export interface ProductType {
  mainImages: string[];
  name: string;
  content: string;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  extra: {
    type: string;
    category: string;
    intro: string;
    online: string;
    offline: string;
    date: string[];
    time: string[];
    person: string;
    userData: string;
  };
}
