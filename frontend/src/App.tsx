import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './App.css'
import ProductList from './pages/ProductList'
import AddPrice from './pages/AddPrice'
import SearchProduct from './pages/SearchProduct'

const App: FC = () => {
  return (
    <Router>
      <Navbar bg="success" expand="lg" sticky="top" className="navbar-dark">
        <Container>
          <Navbar.Brand href="/" className="fw-bold">
            🌾 AgriMarket
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Search Prices</Nav.Link>
              <Nav.Link href="/add-price">Add Price</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/add-price" element={<AddPrice />} />
        </Routes>
      </Container>

      <footer className="bg-light py-3 mt-5 text-center border-top">
        <p className="mb-0 text-muted">
          &copy; 2026 AgriMarket - Helping African farmers get fair market prices
        </p>
      </footer>
    </Router>
  )
}

export default App
