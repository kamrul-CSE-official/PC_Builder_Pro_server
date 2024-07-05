import { Review, Comment, User } from "@prisma/client";

enum Types {
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
  type: Types;
  brand: string;
  model: string;
  title: string;
  description: string;
  price: number;
  image: string;
  seller?: User;
  sellerId: string;
  reviews?: Review[];
  comments?: Comment[];
  createdAt?: Date;
};
