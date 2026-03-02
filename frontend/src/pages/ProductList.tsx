import { useEffect, useState } from 'react'
import type { Product } from '../services/api'
import { getProducts } from '../services/api'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  // Placeholder image service
  const PLACEHOLDER_IMAGE = 'https://i0.wp.com/seds.org/wp-content/uploads/2020/02/placeholder.png?w=1200&ssl=1'

  useEffect(() => {
    console.log('🔵 ProductList mounted, fetching products...')
    loadProducts()
  }, [])

  const handleImageError = (productId: number) => {
    console.log(`🟡 Image failed to load for product ${productId}, using placeholder`)
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const loadProducts = async () => {
    try {
      console.log('🟡 Calling getProducts API...')
      setLoading(true)
      setError(null)
      const response = await getProducts()
      console.log('🟢 Success! Response:', response)
      console.log('🟢 Response type:', typeof response)
      console.log('🟢 Is array?:', Array.isArray(response))
      
      // Handle paginated response - API returns { count, results: [...] }
      let data: Product[] = []
      if (Array.isArray(response)) {
        data = response
      } else if (response && typeof response === 'object') {
        const paginatedResponse = response as { results?: unknown }
        if (Array.isArray(paginatedResponse.results)) {
          data = paginatedResponse.results as Product[]
        }
      }
      
      console.log('🟢 Using data:', data, 'Length:', data.length)
      if (!Array.isArray(data)) {
        throw new Error(`Data is not an array, got: ${typeof data}`)
      }
      setProducts(data)
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      console.error('🔴 Error caught:', errMsg)
      console.error('🔴 Full error:', err)
      setError(errMsg)
    } finally {
      console.log('🟡 Finally block - setting loading to false')
      setLoading(false)
    }
  }

  console.log('🟡 ProductList rendering - loading:', loading, 'error:', error, 'products count:', products.length)

  if (error) {
    return (
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem' }}>
        <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: '0.5rem' }}>
          <h3 style={{ color: '#dc2626', marginBottom: '0.5rem' }}>❌ Error Loading Products</h3>
          <p style={{ color: '#991b1b', marginBottom: '1rem' }}>{error}</p>
          <button onClick={loadProducts} style={{
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>⏳ Loading products...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem' }}>
        <p style={{ color: '#4b5563' }}>No products available.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#111' }}>
        Products ({products.length})
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => {
            console.log('Rendering product:', product.name)
            return (
            <div
              key={product.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Product Image */}
              <div style={{
                height: '200px',
                backgroundColor: '#f9fafb',
                borderRadius: '0.375rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src={imageErrors.has(product.id) || !product.image_url ? PLACEHOLDER_IMAGE : product.image_url}
                  alt={product.name}
                  onError={() => handleImageError(product.id)}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h3 style={{ marginBottom: '0.5rem', color: '#111', fontSize: '1.125rem' }}>
                {product.name}
              </h3>
              <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Unit: <strong>{product.unit}</strong>
              </p>
              
              {product.latest_price ? (
                <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '0.375rem' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
                    {product.latest_price.currency} {product.latest_price.price}
                  </p>
                  <p style={{ color: '#4b5563', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {product.latest_price.location}
                  </p>
                  <p style={{ color: '#999', fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>
                    {new Date(product.latest_price.date_added).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div style={{ backgroundColor: '#fef3c7', padding: '0.75rem', borderRadius: '0.375rem', color: '#92400e' }}>
                  No price data
                </div>
              )}
            </div>
          )
        })
        ) : (
          <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: '#999' }}>
            No products to display
          </div>
        )}
      </div>
    </div>
  )
}
