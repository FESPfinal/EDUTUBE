export interface ProductType {
  _id: number;
  quantity: number;
}

export interface AddressType {
  name: string;
  value: string;
}

export interface IOrderDataType {
  products: ProductType[];
  address: AddressType;
}
