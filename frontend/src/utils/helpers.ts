/**
 * Utility functions for frontend formatting and helpers
 */

import { CURRENCIES, PRICE_FORMAT_OPTIONS } from '../constants'

/**
 * Format a price with currency symbol
 * @param price - The price value
 * @param currency - The currency code (e.g., 'RWF', 'USD')
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency: string = 'RWF'): string => {
  const currencyInfo = CURRENCIES.find(c => c.value === currency)
  const formattedPrice = price.toLocaleString('en-US', PRICE_FORMAT_OPTIONS)
  
  if (currencyInfo) {
    return `${currencyInfo.symbol}${formattedPrice}`
  }
  
  return `${formattedPrice} ${currency}`
}

/**
 * Format a date to a readable string
 * @param dateString - ISO date string
 * @param format - Output format (short or long)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, format: 'short' | 'long' = 'short'): string => {
  const date = new Date(dateString)
  
  if (format === 'short') {
    return date.toLocaleDateString()
  }
  
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format a time difference (e.g., "2 days ago")
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`
  }
  
  if (diffHours < 24) {
    return `${diffHours}h ago`
  }
  
  if (diffDays < 30) {
    return `${diffDays}d ago`
  }
  
  return formatDate(dateString, 'short')
}

/**
 * Calculate price change percentage
 * @param oldPrice - Previous price
 * @param newPrice - Current price
 * @returns Percentage change (positive or negative)
 */
export const calculatePriceChange = (oldPrice: number, newPrice: number): number => {
  if (oldPrice === 0) return 0
  return ((newPrice - oldPrice) / oldPrice) * 100
}

/**
 * Get price change status (up, down, or stable)
 * @param priceChange - Percentage change
 * @returns Status string
 */
export const getPriceChangeStatus = (priceChange: number): 'up' | 'down' | 'stable' => {
  if (priceChange > 5) return 'up'
  if (priceChange < -5) return 'down'
  return 'stable'
}

/**
 * Debounce function for search inputs
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

/**
 * Capitalize first letter of string
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Generate a unique ID
 * @returns Unique ID string
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
