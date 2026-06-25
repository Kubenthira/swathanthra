export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
