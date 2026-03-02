import './App.css'
import ProductList from './pages/ProductList'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '1rem'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
            AgriMarket
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: '0.25rem 0 0 0' }}>
            Agricultural Price Tracker
          </p>
        </div>
      </nav>
      <main>
        <ProductList />
      </main>
    </div>
  )
}

export default App
