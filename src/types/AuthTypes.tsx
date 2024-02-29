export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  register(data: AuthRegisterData): Promise<void>;
  signIn(data: AuthLoginData): Promise<void>;
  logout(): void;
  makeApiCall(params: ApiCallParams): Promise<void>;
};

export type AuthInfoSave = {
  username: string;
  email: string;
};

export type AuthData = {
  token?: string;
  username: string;
};

export type AuthRegisterData = {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
};

export type AuthLoginData = {
  email: string;
  password: string;
};

export type ApiCallParams = {
  method: 'GET';
  url: string;
  data?: any;
  headers?: any;
};
