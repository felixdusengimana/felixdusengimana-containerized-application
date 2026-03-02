import './App.css'
import ProductList from './pages/ProductList'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <nav style={{ backgroundColor: 'white', padding: '1rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', paddingLeft: '1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
            🌾 AgriMarket
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#666', margin: '0.25rem 0 0 0' }}>
            Agricultural Price Tracker
          </p>
        </div>
      </nav>
      <ProductList />
    </div>
  )
}

export default App
