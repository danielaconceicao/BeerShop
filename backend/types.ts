import { RowDataPacket } from "mysql2";
export interface UserFromDB  extends RowDataPacket {
  email: string,
  pass: string,
  id?: number,
  first_name: string,
}

export interface BeerFromDB  extends RowDataPacket {
  product_name: string,
  abv: number,
  size: string,
  brewery: string,
  style: string,
  country: string,
  id: number,
  tasting_notes: string
}

export interface ReviewFromDB  extends RowDataPacket {
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

export interface JwtPayload {
  id: number,
  email: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload
  }
}

