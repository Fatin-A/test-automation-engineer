export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
}
