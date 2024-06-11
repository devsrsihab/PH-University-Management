/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  role: 'admin' | 'student' | 'faculty';
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(plainTextPassword:string, hashedPassword:string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(passwordChangedTimeStamp: Date, jwtIssuedTimeStamp: number): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;