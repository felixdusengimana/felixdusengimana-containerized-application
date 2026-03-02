# AgriMarket 🌾

**Connecting African Farmers to Fair Market Prices**

## Project Overview

AgriMarket is a simple, accessible web application that helps African farmers, traders, and agricultural cooperatives track real-time prices of agricultural products in local markets. By providing transparent, up-to-date pricing information, AgriMarket empowers users to make informed trading decisions and avoid unfair transactions.

## Problem Statement

Farmers across Africa often lack access to current market prices, making them vulnerable to exploitation by middlemen. Without price transparency, farmers cannot negotiate fairly and end up selling their produce at significantly reduced prices. AgriMarket addresses this critical market information gap.

## Target Users

- **Smallholder Farmers**: Track prices before selling their produce
- **Market Traders**: Monitor price trends and make purchasing decisions
- **Agricultural Cooperatives**: Share pricing data with member organizations
- **Consumers**: Understand fair market prices for agricultural products

## Core Features

1. **View Current Prices**: Browse prices for common agricultural products (maize, rice, beans, cassava, tomatoes)
2. **Price Search**: Quickly find products and their current market prices
3. **Add Price Updates**: Community members can contribute new price data
4. **Price History**: Track price trends over time
5. **Mobile-Friendly Interface**: Accessible on smartphones and feature phones

## Technology Stack

- **Backend**: Python 3.9+, Django 4.2+, Django REST Framework
- **Frontend**: React 18+, TypeScript, Vite, React Router, Bootstrap 5
- **Database**: SQLite (development), PostgreSQL (production)
- **API**: RESTful API with Django REST Framework
- **Version Control**: Git & GitHub

## Project Structure

```
agrimarket/
├── backend/                    # Django REST API
│   ├── manage.py              # Django management script
│   ├── requirements.txt        # Python dependencies
│   ├── agrimarket/             # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   └── __init__.py
│   ├── prices/                 # Django app for prices
│   │   ├── models.py           # Product, Price models
│   │   ├── views.py            # API viewsets
│   │   ├── serializers.py      # REST serializers
│   │   ├── urls.py             # App URLs
│   │   ├── admin.py
│   │   └── migrations/
│   └── db.sqlite3              # SQLite database (generated)
│
├── frontend/                   # React + Vite + TypeScript
│   ├── package.json            # Node dependencies
│   ├── vite.config.ts          # Vite configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── public/
│   │   └── index.html          # HTML entry point
│   ├── src/
│   │   ├── main.tsx            # React entry point
│   │   ├── App.tsx             # Main App component
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── pages/              # Page components
│   │   │   ├── ProductList.tsx
│   │   │   ├── SearchProduct.tsx
│   │   │   └── AddPrice.tsx
│   │   ├── components/         # Reusable components (future)
│   │   └── services/           # API services
│   │       └── api.ts          # Axios API client
│   └── dist/                   # Build output
│
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.9 or higher
- Node.js 16+ and npm (for React frontend)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/agrimarket.git
   cd agrimarket
   ```

2. **Create and activate Python virtual environment**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser  # Create admin user
   ```

5. **Load sample data (optional)**
   ```bash
   python manage.py shell
   >>> from prices.models import Product, Price
   >>> from django.utils import timezone
   >>> 
   >>> # Create sample products
   >>> products = [
   ...     Product.objects.create(name='Maize', unit='kg'),
   ...     Product.objects.create(name='Rice', unit='kg'),
   ...     Product.objects.create(name='Beans', unit='kg'),
   ...     Product.objects.create(name='Cassava', unit='kg'),
   ...     Product.objects.create(name='Tomatoes', unit='kg'),
   ... ]
   >>> 
   >>> # Create sample prices
   >>> Price.objects.create(product=products[0], price=150.0, location='Kigali Market', currency='RWF')
   >>> Price.objects.create(product=products[1], price=250.0, location='Kigali Market', currency='RWF')
   >>> # Add more as needed
   >>> exit()
   ```

6. **Run the backend server**
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

   The backend API will be available at: `http://localhost:8000/api/`

### Frontend Setup

1. **In a new terminal, navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at: `http://localhost:5173`

### Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## How to Use

1. **View Prices**: The homepage displays current prices for all agricultural products
2. **Search Products**: Use the search bar to find specific products and view their price history
3. **Add New Price**: Click "Add Price" to contribute new pricing data for a product
4. **View Statistics**: See min, max, and average prices for each product

## API Documentation

The backend provides a RESTful API with the following endpoints:

### Products
- `GET /api/products/` - List all products with latest prices
- `GET /api/products/{id}/` - Get detailed product info with full price history
- `GET /api/products/{id}/price-stats/` - Get price statistics (min, max, average)
- `POST /api/products/{id}/add-price/` - Add a new price for a product
- `GET /api/products/summary/` - Get overall summary statistics

### Prices
- `GET /api/prices/` - List all prices (with filtering by product_id)
- `POST /api/prices/` - Create a new price record
- `GET /api/prices/{id}/` - Get a specific price record

### Admin
- `GET /admin/` - Django admin panel (requires authentication)

## Team Information

| Name | Role |
|------|------|
| Felix Dusengimana | Full Stack Developer & DevOps Lead |

## Development Roadmap

- [x] Core price tracking functionality
- [x] Mobile-responsive design
- [ ] User authentication & roles
- [ ] Advanced analytics & charts
- [ ] SMS notifications for price alerts
- [ ] Multi-language support (Swahili, French, Amharic)
- [ ] Offline-first capability for feature phones
- [ ] Mobile app (React Native)

## Contributing

We follow a professional DevOps workflow:
- All changes require pull requests
- Code reviews are mandatory before merging
- Use meaningful commit messages
- Break work into small, focused tasks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ for African farmers
- Inspired by real market challenges in East Africa
- Developed as part of an ALU DevOps Engineering course

## Support & Contact

For questions or issues, please open a GitHub issue or contact the development team.

---

**Last Updated**: March 2, 2026
