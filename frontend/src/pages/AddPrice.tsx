import { FC, useEffect, useState } from 'react'
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { productAPI, priceAPI, Product } from '../services/api'

const AddPrice: FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    product: '',
    price: '',
    location: '',
    currency: 'RWF',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAllProducts()
      setProducts(response.data)
    } catch (err) {
      setError('Failed to load products.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.product || !formData.price || !formData.location) {
      setError('Please fill in all required fields.')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      
      const selectedProduct = products.find(p => p.id.toString() === formData.product)
      if (!selectedProduct) {
        setError('Invalid product selected.')
        return
      }

      await priceAPI.addPrice({
        product: selectedProduct.id,
        price: parseFloat(formData.price),
        location: formData.location,
        currency: formData.currency,
      } as any)

      setSuccess(true)
      setFormData({
        product: '',
        price: '',
        location: '',
        currency: 'RWF',
      })

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Failed to add price. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2>Add Price Information</h2>
        <p className="text-muted">
          Help other farmers by sharing current market prices
        </p>
      </div>

      {success && (
        <Alert variant="success">
          ✓ Price added successfully! Thank you for contributing.
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="border rounded p-4 bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Product *</Form.Label>
          <Form.Select
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a product...</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price *</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            step="0.01"
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location *</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., Kigali Market, Gitarama Market"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Currency</Form.Label>
          <Form.Select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
          >
            <option value="RWF">RWF (Rwandan Franc)</option>
            <option value="USD">USD (US Dollar)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="KES">KES (Kenyan Shilling)</option>
          </Form.Select>
        </Form.Group>

        <Button 
          variant="success" 
          type="submit" 
          disabled={submitting}
          className="w-100"
        >
          {submitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Adding...
            </>
          ) : (
            'Add Price'
          )}
        </Button>
      </Form>
    </Container>
  )
}

export default AddPrice
