import { RowDataPacket } from "mysql2";
export interface UserRequest extends RowDataPacket {
  email: string,
  pass: string,
  id?: number,
  first_name: string,
}

export interface BeersRequest extends RowDataPacket {
  product_name: string,
  abv: number,
  size: string,
  brewery: string,
  style: string,
  country: string,
  id: number,
  tasting_notes: string
}

export interface ReviewsRequest extends RowDataPacket {
  rating: number,
  comment: string,
  reviewer_name: string,
  created_at: number
  id: number
}

export interface MySQLError {
  code: string;
  message: string;
}

