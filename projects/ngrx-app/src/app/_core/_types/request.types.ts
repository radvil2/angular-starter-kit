export interface ILoginRequest {

    username: string;
    password: string;

}

export interface IRegisterRequest {

    name: string;
    username: string;
    email: string;
    password: string;

}

export interface IRevokeTokenRequest {

    token: string;

}
