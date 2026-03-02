import { FC, useState } from 'react'
import { Container, Form, Button, Alert, Row, Col, Card, Spinner, Badge } from 'react-bootstrap'
import { usePriceStats, useProductDetail } from '../hooks/useApi'
import { productAPI, Product, Price, PriceStats } from '../services/api'
import { formatPrice, formatDate, capitalize } from '../utils/helpers'

const SearchProduct: FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [stats, setStats] = useState<PriceStats | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      setError('Please enter a product name.')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setNotFound(false)
      setProduct(null)
      setStats(null)

      const response = await productAPI.searchProducts(searchQuery)
      
      if (response.data.length === 0) {
        setNotFound(true)
        return
      }

      const foundProduct = response.data[0]
      
      // Fetch detailed info
      const detailResponse = await productAPI.getProductDetail(foundProduct.id)
      setProduct(detailResponse.data)

      // Fetch stats
      const statsResponse = await productAPI.getPriceStats(foundProduct.id)
      setStats(statsResponse.data)
    } catch (err) {
      setError('Failed to search for product. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2>Search Prices</h2>
        <p className="text-muted">
          Find price information for agricultural products
        </p>
      </div>

      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group className="d-flex gap-2">
          <Form.Control
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a product (e.g., Maize, Rice)..."
            className="search-input"
          />
          <Button 
            variant="success" 
            type="submit" 
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
          </Button>
        </Form.Group>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {notFound && (
        <Alert variant="warning">
          No products found matching "{searchQuery}". Please try a different search term.
        </Alert>
      )}

      {product && (
        <div>
          <Row className="mb-4">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title className="fs-4">{product.name}</Card.Title>
                  {product.description && (
                    <Card.Text className="text-muted">
                      {product.description}
                    </Card.Text>
                  )}
                  <Card.Text>
                    <strong>Unit:</strong> {capitalize(product.unit)}
                  </Card.Text>
                  <Badge bg="secondary">
                    {product.prices?.length || 0} price records
                  </Badge>
                </Card.Body>
              </Card>
            </Col>

            {stats && (
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title className="fs-5">Price Statistics</Card.Title>
                    <div className="mb-3 pb-2 border-bottom">
                      <small className="text-muted d-block mb-1">Average Price</small>
                      <div className="fs-5 text-success">
                        {formatPrice(stats.average_price, stats.currency)}
                      </div>
                    </div>
                    <div className="mb-3 pb-2 border-bottom">
                      <small className="text-muted d-block mb-1">Highest Price</small>
                      <div className="fs-5">
                        {formatPrice(stats.highest_price, stats.currency)}
                      </div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">Lowest Price</small>
                      <div className="fs-5">
                        {formatPrice(stats.lowest_price, stats.currency)}
                      </div>
                    </div>
                    <hr />
                    <small className="text-muted">
                      Based on {stats.total_records} price records
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>

          {product.prices && product.prices.length > 0 && (
            <div className="price-history">
              <h5 className="mb-3">
                Price History ({product.prices.length} records)
              </h5>
              <Row>
                {product.prices.map((price: Price) => (
                  <Col md={6} lg={4} key={price.id} className="mb-3">
                    <Card className="price-record h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <div className="price-badge">
                              {formatPrice(price.price, price.currency)}
                            </div>
                            <small className="location-text d-block mt-2">
                              📍 {price.location}
                            </small>
                          </div>
                        </div>
                        <div className="text-muted">
                          <small>{formatDate(price.date_added)}</small>
                        </div>
                        {price.source && (
                          <div className="text-muted">
                            <small>Source: {price.source}</small>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

export default SearchProduct
