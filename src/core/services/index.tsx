import buildQueryParams, { QueryParams } from "../utils/buildQueryParams";
import { get  } from "./request";

export const getCategories =  () => get('products/categories');

export const getProducts = (query?: QueryParams, search?: boolean,) => get(`products${search ? '/search' : ''}${query ? buildQueryParams(query) : ''}`);

export const getProductDetail = (id:string, query?: QueryParams) => get(`products/${id}${query ? buildQueryParams(query) : ''}`);