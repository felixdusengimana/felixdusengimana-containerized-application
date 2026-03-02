import { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap'
import { productAPI, Product } from '../services/api'

const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productAPI.getAllProducts()
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  return (
    <Container>
      <div className="mb-4">
        <h1 className="mb-2">🌾 AgriMarket</h1>
        <p className="text-muted">
          Current agricultural product prices in local markets
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {products.length === 0 ? (
        <Alert variant="info">No products available yet.</Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col md={6} lg={4} key={product.id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="fs-5">{product.name}</Card.Title>
                  <Card.Text className="text-muted">
                    Unit: {product.unit}
                  </Card.Text>
                  
                  {product.latest_price ? (
                    <div>
                      <div className="price-badge">
                        {product.latest_price.price} {product.latest_price.currency}
                      </div>
                      <p className="location-text mt-2">
                        📍 {product.latest_price.location}
                      </p>
                      <small className="text-muted d-block">
                        Last updated: {new Date(product.latest_price.date_added).toLocaleDateString()}
                      </small>
                    </div>
                  ) : (
                    <Alert variant="warning" className="mb-0">
                      No price data available
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default ProductList
