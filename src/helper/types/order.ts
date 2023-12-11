export type Product = {
  _id: number;
  quantity: number;
};

export type Address = {
  name: string;
  value: string;
};

export type OrderData = {
  products: Product[];
  address: Address;
};
