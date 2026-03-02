import { FC } from 'react'
import { Container, Row, Col, Card, Spinner, Alert, Badge } from 'react-bootstrap'
import { useProducts } from '../hooks/useApi'
import { formatPrice, formatRelativeTime } from '../utils/helpers'

const ProductList: FC = () => {
  const { products, loading, error } = useProducts()

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
        <Badge bg="info">{products.length} products tracked</Badge>
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
                        {formatPrice(product.latest_price.price, product.latest_price.currency)}
                      </div>
                      <p className="location-text mt-2">
                        📍 {product.latest_price.location}
                      </p>
                      <small className="text-muted d-block">
                        {formatRelativeTime(product.latest_price.date_added)}
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
