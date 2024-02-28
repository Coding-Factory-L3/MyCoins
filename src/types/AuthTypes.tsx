export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  register(data: AuthData): Promise<void>;
  signIn(data: AuthData): Promise<void>;
  signOut(): void;
  makeApiCall(params: ApiCallParams): Promise<any>;
};

export type AuthData = {
  token?: string;
  username: string;
  password: string;
};

export type ApiCallParams = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
  headers?: any;
};
export type ApiResponse<T> = {
  data: T;
};
