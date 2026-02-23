import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999,
    description: 'The first iPhone with an aerospace‑grade titanium design, using the same alloy that spacecraft use for missions to Mars.',
    specs: {
      screen: '6.1" Super Retina XDR',
      processor: 'A17 Pro chip',
      ram: '8GB',
      storage: '128GB/256GB/512GB/1TB',
      camera: '48MP Main | Ultra Wide | Telephoto',
      battery: 'Up to 23 hours video playback'
    },
    image: 'https://picsum.photos/seed/iphone15pro/800/800',
    color: 'Natural Titanium',
    isNew: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1299,
    description: 'The ultimate Galaxy Ultra experience, now with Galaxy AI. Unleash new levels of creativity, productivity and possibility.',
    specs: {
      screen: '6.8" QHD+ Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB/512GB/1TB',
      camera: '200MP Main | 50MP Periscope | 10MP Telephoto | 12MP Ultra Wide',
      battery: '5000mAh'
    },
    image: 'https://picsum.photos/seed/s24ultra/800/800',
    color: 'Titanium Gray',
    isNew: true
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 899,
    description: 'The all-pro phone engineered by Google. It’s sleek, sophisticated, and has the most advanced Pixel Camera yet.',
    specs: {
      screen: '6.7" Super Actua display',
      processor: 'Google Tensor G3',
      ram: '12GB',
      storage: '128GB/256GB/512GB/1TB',
      camera: '50MP Main | 48MP Ultra Wide | 48MP Telephoto',
      battery: '5050mAh'
    },
    image: 'https://picsum.photos/seed/pixel8pro/800/800',
    color: 'Bay',
    isNew: true
  },
  {
    id: '4',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 799,
    description: 'Smooth Beyond Belief. The OnePlus 12 defines the new gold standard for flagship performance and elegance.',
    specs: {
      screen: '6.82" QHD+ ProXDR',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB/16GB',
      storage: '256GB/512GB',
      camera: '50MP Main | 64MP Periscope | 48MP Ultra Wide',
      battery: '5400mAh'
    },
    image: 'https://picsum.photos/seed/oneplus12/800/800',
    color: 'Silky Black'
  },
  {
    id: '5',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 1199,
    description: 'A legendary design with a Leica quad camera system. Photography redefined.',
    specs: {
      screen: '6.73" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '512GB',
      camera: '50MP Quad Camera System (Leica)',
      battery: '5000mAh'
    },
    image: 'https://picsum.photos/seed/xiaomi14ultra/800/800',
    color: 'Black'
  },
  {
    id: '6',
    name: 'Sony Xperia 1 V',
    brand: 'Sony',
    price: 1099,
    description: 'Unprecedented image quality with a next-generation sensor. For creators, by creators.',
    specs: {
      screen: '6.5" 4K HDR OLED 21:9',
      processor: 'Snapdragon 8 Gen 2',
      ram: '12GB',
      storage: '256GB',
      camera: '48MP Main | 12MP Telephoto | 12MP Ultra Wide',
      battery: '5000mAh'
    },
    image: 'https://picsum.photos/seed/xperia1v/800/800',
    color: 'Khaki Green'
  }
];
