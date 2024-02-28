export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  register(data: AuthRegisterData): Promise<void>;
  signIn(data: AuthLoginData): Promise<void>;
  logout(): void;
  makeApiCall(params: ApiCallParams): Promise<void>;
};

export type AuthData = {
  token?: string;
  username: string;
};

export type AuthRegisterData = {
  username: string;
  password: string;
  confirmPassword?: string;
};

export type AuthLoginData = {
  username: string;
  password: string;
};

export type ApiCallParams = {
  method: 'GET';
  url: string;
  data?: any;
  headers?: any;
};
