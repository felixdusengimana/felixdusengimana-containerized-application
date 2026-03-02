import { useState, useEffect } from 'react'
import api, { Product, PriceStats } from '../services/api'

/**
 * Hook to fetch products from the API
 * @returns Object with products data, loading, and error states
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await api.get<Product[]>('/products/')
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => fetchProducts()

  return { products, loading, error, refetch }
}

/**
 * Hook to fetch product details
 * @param productId - The ID of the product to fetch
 * @returns Object with product data, loading, and error states
 */
export const useProductDetail = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await api.get<Product>(`/products/${productId}/`)
      setProduct(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load product details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { product, loading, error }
}

/**
 * Hook to fetch price statistics
 * @param productId - The ID of the product
 * @returns Object with statistics data, loading, and error states
 */
export const usePriceStats = (productId: number) => {
  const [stats, setStats] = useState<PriceStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (productId) {
      fetchStats()
    }
  }, [productId])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await api.get<PriceStats>(`/products/${productId}/price-stats/`)
      setStats(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load price statistics')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { stats, loading, error }
}
