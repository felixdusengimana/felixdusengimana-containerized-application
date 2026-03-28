import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${window.location.origin.replace(':3000', ':8000')}/api`;

export interface Product {
  id: number;
  name: string;
  unit: string;
  description: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  latest_price?: {
    price: string;
    location: string;
    currency: string;
    date_added: string;
  };
}

export interface Price {
  id: number;
  product: number;
  price: string;
  location: string;
  currency: string;
  date_added: string;
  source?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async () => {
  const response = await api.get<Product[]>('/products/');
  return response.data;
};

export const getProductDetail = async (id: number) => {
  const response = await api.get<Product>(`/products/${id}/`);
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await api.get<Product[]>('/products/', {
    params: { search: query },
  });
  return response.data;
};

export const getPrices = async (productId?: number) => {
  const response = await api.get<Price[]>('/prices/', {
    params: productId ? { product: productId } : undefined,
  });
  return response.data;
};

export const addPrice = async (priceData: Omit<Price, 'id'>) => {
  const response = await api.post('/prices/', priceData);
  return response.data;
};

export default api;
