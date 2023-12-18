export type Step1RegistData = {
  mainImage: string[];
  name: string;
  content: string;
  shippingFees: number;
  show: boolean;
  active: boolean;
  extra: {
    intro: string;
  };
};

export type Step2RegistData = Step1RegistData & {
  extra: {
    intro: string;
    online: string;
    offline: string;
    date: string[];
    time: string[];
  };
};

export type Step3RegistData = Step2RegistData & {
  price: number,
  extra: {
    person: number
  }
}

// export interface ProductType {
//   mainImages: string[];
//   name: string;
//   content: string;
//   price: number;
//   shippingFees: number;
//   show: boolean;
//   active: boolean;
//   extra: {
//     type: string;
//     category: string;
//     intro: string;
//     online: string;
//     offline: string;
//     date: string[];
//     time: string[];
//     person: string;
//     userData: string;
//   };
// }
