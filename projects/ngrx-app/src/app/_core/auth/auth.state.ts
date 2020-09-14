import { IUser, IBackendErrors } from '../_types';

export interface IAuthState {

  currentUser: IUser | null;
  isLoggedIn: boolean | null;
  isSubmitting: boolean;
  isLoading: boolean;
  errors: IBackendErrors | Error | null;

}

export const initialAuthState: IAuthState = {

  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: false,
  errors: null

};