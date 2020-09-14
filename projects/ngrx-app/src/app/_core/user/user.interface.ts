import { TBase } from '../_types/base.type';

export interface IAccount extends TBase {

  username: string;
  picture: string | null;
  email?: string | null;
  lastLogin?: string | Date;
  role?: string | string[];
  password?: string | null;
  token?: string;

}

export interface IUser extends IAccount {

  name: string;
  gender: string | null;
  birthday: Date | string | null;
  coverPicture?: string | File | null;
  company?: string | null;
  job?: string | null;
  totalFollowers?: number | null;
  totalPosts?: number | null;

}
