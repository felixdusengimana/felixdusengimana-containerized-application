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

## Docker & Containerization

AgriMarket is fully containerized for consistent development and deployment across any environment.

### Docker Setup

#### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

#### Quick Start with Docker Compose

Run the entire application stack with a single command:

```bash
# Build and start both frontend and backend services
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/

#### Manual Docker Build

If you need to build specific images:

```bash
# Build backend image
docker build -f Dockerfile.backend -t agrimarket-backend .

# Build frontend image
docker build -f Dockerfile.frontend -t agrimarket-frontend .

# Run backend container
docker run -p 8000:8000 agrimarket-backend

# Run frontend container
docker run -p 3000:3000 agrimarket-frontend
```

### Docker Features

- **Multi-stage builds**: Reduces image size by separating build and runtime stages
- **Non-root users**: Containers run as unprivileged users for security
- **Health checks**: Automated health monitoring for containers
- **Layer caching**: Optimized Dockerfile structure for faster builds
- **Environment configuration**: Easy configuration via environment variables
- **Volume persistence**: Database and file changes persist across container restarts

### Dockerfiles Explained

#### Dockerfile.backend
- Uses `python:3.11-slim` for minimal size
- Installs system dependencies and Python packages
- Runs as non-root user `appuser` (UID 1000)
- Exposes port 8000 for Django development server
- Includes health checks using Django's `manage.py check`

#### Dockerfile.frontend
- **Build stage**: Node.js 18 Alpine to build the React app
- **Runtime stage**: Nginx Alpine serves the production files
- Uses multi-stage build to minimize final image size
- Includes nginx configuration for SPA routing
- Runs as non-root user for security
- Exposes port 3000 for frontend

### docker-compose.yml

The Docker Compose configuration includes:

**Backend Service**
- Builds from `Dockerfile.backend`
- Maps port 8000
- Mounts volumes for development and data persistence
- Configured with Django environment variables
- Resource limits: 1 CPU, 512MB RAM
- Health checks every 30 seconds

**Frontend Service**
- Builds from `Dockerfile.frontend`
- Maps port 3000
- Mounted volumes for live reloading
- Depends on backend service
- Resource limits: 0.5 CPU, 256MB RAM
- Health checks every 30 seconds

**Custom Network**
- Creates isolated `agrimarket-network` bridge network
- Enables service-to-service communication

## Environment Configuration

The application uses environment variables to manage configuration across development, testing, and production environments. All environment variables are documented in `.env.example`.

### Setup Local Environment

1. **Copy the example environment file**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your configuration**
   ```bash
   nano .env  # Or use your preferred editor
   ```

### Available Environment Variables

**Django Settings**
- `DEBUG` - Enable/disable debug mode (default: `False`)
- `SECRET_KEY` - Django secret key for security (default: development key)
- `ALLOWED_HOSTS` - Comma-separated list of allowed hostnames (default: `localhost,127.0.0.1,backend`)

**Database**
- `DATABASE_URL` - Database connection string (default: `sqlite:///db.sqlite3`)

**CORS**
- `CORS_ALLOWED_ORIGINS` - Comma-separated list of allowed origins for CORS (default: frontend localhost URLs)

**Django Superuser**
- `DJANGO_SUPERUSER_USERNAME` - Admin username (default: `admin`)
- `DJANGO_SUPERUSER_PASSWORD` - Admin password (default: `admin`)
- `DJANGO_SUPERUSER_EMAIL` - Admin email (default: `admin@agrimarket.local`)

**Frontend**
- `VITE_API_URL` - Backend API URL for frontend (default: `http://localhost:8000/api`)

### Docker Compose with Environment Variables

The docker-compose file automatically loads environment variables from the `.env` file:

```bash
# With default values from .env
docker-compose up -d

# Override specific variables
docker-compose up -d -e DEBUG=False -e SECRET_KEY=your-production-key
```

### Environment-Specific Configuration

**Development**
```env
DEBUG=True
SECRET_KEY=django-insecure-development-key
ALLOWED_HOSTS=localhost,127.0.0.1,backend
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
VITE_API_URL=http://localhost:8000/api
```

**Production**
```env
DEBUG=False
SECRET_KEY=your-secure-production-key
ALLOWED_HOSTS=agrimarket.example.com,www.agrimarket.example.com
DATABASE_URL=postgresql://user:password@db.example.com:5432/agrimarket
CORS_ALLOWED_ORIGINS=https://agrimarket.example.com,https://www.agrimarket.example.com
VITE_API_URL=https://api.agrimarket.example.com
```

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

## Continuous Integration/Continuous Deployment (CI/CD)

AgriMarket uses GitHub Actions to automate testing, linting, and Docker image builds on every push and pull request.

### CI Pipeline Overview

The `.github/workflows/ci.yml` file defines automated checks that run on:
- **Every push** to any branch except main
- **Every pull request** targeting main

### Pipeline Jobs

#### 1. Backend Tests & Lint
- Sets up Python 3.11 environment
- Installs dependencies
- Runs Black code formatting check
- Runs Flake8 linting
- Executes Django system checks
- Applies database migrations
- Runs pytest test suite

#### 2. Frontend Tests & Lint
- Sets up Node.js 18 environment
- Installs npm dependencies
- Runs TypeScript type checking
- Runs ESLint
- Builds production bundle
- Verifies build output exists

#### 3. Docker Build
- Builds backend Docker image
- Builds frontend Docker image
- Ensures images compile without errors

#### 4. Docker Compose Integration Test
- Starts all services with Docker Compose
- Tests backend API health
- Tests frontend health
- Verifies services communicate correctly
- Logs failures for diagnosis

#### 5. Security Checks
- Runs Bandit security scan on Python code
- Scans for exposed secrets with TruffleHog
- Prevents commits with hard-coded credentials

### Branch Protection Rules

The `main` branch is protected with:
- ✅ All CI checks must pass before merging
- ✅ Require pull request code review
- ✅ Require status checks to pass
- ✅ Include administrators in restrictions

To merge to main, all pipeline jobs must succeed, and a team member must approve the pull request.

### Running CI Locally

To simulate the CI pipeline locally:

```bash
# Run backend tests
cd backend
flake8 . --statistics
pytest . -v

# Run frontend tests
cd ../frontend
npm run build
npm run lint  # if configured

# Build and test with Docker Compose
cd ..
docker-compose up -d
docker-compose logs -f
docker-compose down
```

### Viewing CI Results

1. **GitHub Actions Dashboard**: https://github.com/felixdusengimana/agrimarket/actions
2. **Pull Request Checks**: See CI status on each PR
3. **Branch Status**: Merge button shows CI status

### Failed CI Runs

If CI fails:
1. Check the failed job logs in GitHub Actions
2. Read the error message carefully
3. Fix the issue locally
4. Push the fix and CI will re-run automatically
5. Merge only when all checks ✅ pass

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
