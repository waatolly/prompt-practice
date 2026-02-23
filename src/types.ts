export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  specs: {
    screen: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
    battery: string;
  };
  image: string;
  color: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
