export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  register(data: AuthRegisterData): Promise<void>;
  signIn(data: AuthLoginData): Promise<void>;
  logout(): void;
  makeApiCall(params: ApiCallParams): Promise<void>;
  updateFavorite(data: any): Promise<void>;
};

export type AuthInfoSave = {
  username: string;
  email: string;
};

export type AuthData = {
  token?: string;
  username: string;
  email: string;
  favorites?: {
    coins?: string[];
    nfts?: string[];
    exchanges?: string[];
  };
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
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
  headers?: any;
};
export type ApiResponse<T> = {
  data: T;
};
