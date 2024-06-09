import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  role: 'admin' | 'student' | 'faculty';
  needPasswordChange: boolean;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(plainTextPassword:string, hashedPassword:string): Promise<boolean>;
}
