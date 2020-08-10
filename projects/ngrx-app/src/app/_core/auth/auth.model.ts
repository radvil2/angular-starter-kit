import { IAccount } from '../user';

export interface IAuthState {
  account: IAccount;
	token: string;
	isAuthenticated: boolean;
}
