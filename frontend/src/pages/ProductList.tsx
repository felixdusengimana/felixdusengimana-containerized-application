import { useEffect, useState } from 'react'
import type { Product } from '../services/api'
import { getProducts } from '../services/api'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            animation: 'spin 1s linear infinite',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            borderBottom: '4px solid #22c55e'
          }} />
          <p style={{ marginTop: '1rem', color: '#4b5563' }}>Loading products...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fef2f2', padding: '1rem' }}>
        <div style={{
          maxWidth: '28rem',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '0.5rem' }}>
            Error Loading Products
          </h2>
          <p style={{ color: '#111827', marginBottom: '1rem' }}>{error}</p>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            Make sure the backend is running on http://localhost:8000
          </p>
          <button
            onClick={loadProducts}
            style={{
              marginTop: '1rem',
              width: '100%',
              backgroundColor: '#22c55e',
              color: 'white',
              fontWeight: '600',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#22c55e')}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            🌾 AgriMarket
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '1rem' }}>
            Current agricultural product prices in local markets
          </p>
          <span style={{
            display: 'inline-block',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {products.length} products tracked
          </span>
        </div>

        {products.length === 0 ? (
          <div style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #93c5fd',
            borderRadius: '0.5rem',
            padding: '1rem'
          }}>
            <p style={{ color: '#1e40af' }}>No products available yet.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)')}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)')}
              >
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    Unit: <span style={{ fontWeight: '500' }}>{product.unit}</span>
                  </p>

                  {product.latest_price ? (
                    <div style={{
                      backgroundColor: '#f0fdf4',
                      borderRadius: '0.5rem',
                      padding: '1rem'
                    }}>
                      <p style={{
                        fontSize: '1.875rem',
                        fontWeight: 'bold',
                        color: '#16a34a',
                        marginBottom: '0.5rem'
                      }}>
                        {product.latest_price.currency} {product.latest_price.price}
                      </p>
                      <p style={{ color: '#1f2937', marginBottom: '0.5rem' }}>
                        📍 {product.latest_price.location}
                      </p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {new Date(product.latest_price.date_added).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: '#fefce8',
                      border: '1px solid #fef08a',
                      borderRadius: '0.5rem',
                      padding: '1rem'
                    }}>
                      <p style={{ color: '#854d0e', fontSize: '0.875rem' }}>
                        No price data available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
