/**
 * Frontend constants and configuration
 */

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

// Product units
export const PRODUCT_UNITS = [
  { value: 'kg', label: 'Kilogram' },
  { value: 'bag', label: 'Bag (50kg)' },
  { value: 'bunch', label: 'Bunch' },
  { value: 'piece', label: 'Piece' },
  { value: 'liter', label: 'Liter' },
]

// Currencies
export const CURRENCIES = [
  { value: 'RWF', label: 'RWF (Rwandan Franc)', symbol: 'Rf' },
  { value: 'USD', label: 'USD (US Dollar)', symbol: '$' },
  { value: 'EUR', label: 'EUR (Euro)', symbol: '€' },
  { value: 'KES', label: 'KES (Kenyan Shilling)', symbol: 'Ksh' },
  { value: 'UGX', label: 'UGX (Ugandan Shilling)', symbol: 'USh' },
  { value: 'TZS', label: 'TZS (Tanzanian Shilling)', symbol: 'Tsh' },
]

// Common markets/locations in East Africa
export const COMMON_LOCATIONS = [
  'Kigali Market',
  'Musanze Market',
  'Gitarama Market',
  'Butare Market',
  'Huye Market',
  'Nyeri Market',
  'Nairobi Market',
  'Kisumu Market',
  'Dar es Salaam Market',
  'Mbeya Market',
]

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

// Pagination settings
export const ITEMS_PER_PAGE = 10
export const MAX_ITEMS_PER_PAGE = 100

// Debounce delay (milliseconds)
export const SEARCH_DEBOUNCE_DELAY = 300

// Price formatting
export const PRICE_FORMAT_OPTIONS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}
