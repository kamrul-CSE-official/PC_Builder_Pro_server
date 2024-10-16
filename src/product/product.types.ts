import { Review, User } from "@prisma/client";

export enum ITypes {
  MONITOR,
  MOTHERBOARD,
  RAM,
  MOUSE,
  KEYBOARD,
  SSD,
  PROCESSOR,
  OTHERS,
}

export type IProduct = {
  id?: string;
  type: ITypes;
  brand: string;
  model: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  image: string;
  seller?: User;
  sellerId: string;
  reviews?: Review[];
  comments?: Comment[];
  createdAt?: Date;
};
