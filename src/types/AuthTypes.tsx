export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  register(data: AuthData): Promise<void>;
  signIn(data: AuthData): Promise<void>;
  signOut(): void;
  makeApiCall({method, url, data, headers}: ApiCallParams): Promise<void>;
};

export type AuthData = {
  token?: string;
  username: string;
  password: string;
};

export type ApiCallParams = {
  method: 'GET';
  url: string;
  data?: any;
  headers?: any;
};