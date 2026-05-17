export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  mainImage: string;
  categoryId: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'customer';
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: any;
}
