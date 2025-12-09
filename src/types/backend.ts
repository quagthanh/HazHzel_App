export interface IRequest {
  url: string;
  method: string;
  body?: { [key: string]: any };
  queryParams?: any;
  useCredentials?: boolean;
  headers?: any;
  nextOption?: any;
}

export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
}

export interface ILogin {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  access_token: string;
}
export type loginDTO = {
  username: string;
  password: string;
};
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IProductImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

export interface IProductCategory {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IProductSupplier {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IProductVariant {}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  stock: number;
  views: number;
  categoryId: IProductCategory;
  supplierId: IProductSupplier;
  variants: IProductVariant[];
  images: IProductImage[];
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IUserTable {
  _id: string;
  name: string;
  email: string;
}

export interface IProps {
  users: IUserTable[] | [];
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}
