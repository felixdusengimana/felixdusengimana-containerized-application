import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Product {
  id: number
  name: string
  unit: string
  description?: string
  prices?: Price[]
  latest_price?: Price
  created_at?: string
  updated_at?: string
}

export interface Price {
  id: number
  product: number
  price: number
  location: string
  currency: string
  date_added: string
  source?: string
}

export interface PriceStats {
  product_id: number
  product_name: string
  average_price: number
  highest_price: number
  lowest_price: number
  total_records: number
  currency: string
}

export const productAPI = {
  // Get all products with their latest prices
  getAllProducts: () => api.get<Product[]>('/products/'),
  
  // Get detailed info for a specific product including price history
  getProductDetail: (id: number) => api.get<Product>(`/products/${id}/`),
  
  // Get price statistics for a product
  getPriceStats: (id: number) => api.get<PriceStats>(`/products/${id}/price-stats/`),
  
  // Search products by name
  searchProducts: (query: string) => api.get<Product[]>('/products/', { params: { search: query } }),
  
  // Get summary statistics
  getSummary: () => api.get('/products/summary/'),
}

export const priceAPI = {
  // Get all prices
  getAllPrices: () => api.get<Price[]>('/prices/'),
  
  // Add a new price
  addPrice: (data: Omit<Price, 'id' | 'date_added'>) => api.post<Price>('/prices/', data),
  
  // Get prices for a specific product
  getPricesForProduct: (productId: number) => 
    api.get<Price[]>('/prices/', { params: { product_id: productId } }),
}

export default api
