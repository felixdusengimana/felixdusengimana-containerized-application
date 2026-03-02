import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  // Get all products with their latest prices
  getAllProducts: () => api.get('/products/'),
  
  // Get detailed info for a specific product including price history
  getProductDetail: (id) => api.get(`/products/${id}/`),
  
  // Get price statistics for a product
  getPriceStats: (id) => api.get(`/products/${id}/price-stats/`),
  
  // Search products by name
  searchProducts: (query) => api.get('/products/', { params: { search: query } }),
  
  // Get summary statistics
  getSummary: () => api.get('/products/summary/'),
};

export const priceAPI = {
  // Get all prices
  getAllPrices: () => api.get('/prices/'),
  
  // Add a new price
  addPrice: (data) => api.post('/prices/', data),
  
  // Get prices for a specific product
  getPricesForProduct: (productId) => 
    api.get('/prices/', { params: { product_id: productId } }),
};

export default api;
