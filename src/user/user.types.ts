import { Role, Review, Comment, Product, User } from '@prisma/client';

export type IUser = {
    id?: string;
    email: string;
    name: string;
    profilePic?: string;
    password: string;
    role?: Role;
    reviews?: Review[];
    comments?: Comment[];
    products?: Product[];
    createdAt?: Date;
  };
  
  export type IProduct = {
    id: string;
    model: string;
    title: string;
    description: string;
    price: number;
    image: string;
    seller: User;
    sellerId: string;
    reviews?: Review[];
    comments?: Comment[];
    createdAt?: Date;
  };
  
  export type IComment = {
    id: string;
    comment: string;
    product: Product;
    productId: string;
    user: User;
    userId: string;
    createdAt?: Date;
  };
  
  export type IReview = {
    id: string;
    rating: number;
    content: string;
    product: Product;
    productId: string;
    user: User;
    userId: string;
    createdAt?: Date;
  };