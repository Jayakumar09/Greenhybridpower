# SISFS - Sustainable Integrated Smart Financing System

A complete production-ready full-stack web application for a clean energy financing platform called "SISFS" for https://greenhybridpower.in.

## Tech Stack

### Frontend
- React 18 with Vite
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management
- React Hook Form + Zod for validation
- Recharts for data visualization
- React Hot Toast for notifications

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT authentication
- bcrypt password hashing
- Helmet, CORS, rate limiting, compression

## Project Structure

```
/frontend               # React frontend
  /src
    /api              # API configuration
    /components       # Reusable components
    /context          # React contexts
    /pages            # Page components
      /admin          # Admin dashboard pages
      /customer       # Customer dashboard pages
  /public             # Static assets

/backend               # Express backend
  /src
    /controllers      # Route controllers
    /middlewares      # Express middlewares
    /routes           # API routes
  /prisma             # Database schema & migrations
```

## Features

### Authentication
- Customer registration/login
- Admin login
- JWT-based authentication
- Role-based access control (admin, customer)

### Business Modules
- Leads management
- Site inspection bookings
- Solar quotations with EMI calculations
- Installation tracking
- Payment management
- Service requests
- Energy monitoring (demo data)

### Calculators
- Solar system size calculator
- Electricity bill savings calculator
- Panel requirement calculator
- Battery backup calculator
- EMI calculator
- ROI calculator

### Dashboards
- Admin dashboard with stats and charts
- Customer dashboard with tracking

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Cloudinary account (for file uploads)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```
PORT=5000
DATABASE_URL=postgresql://username:password@host:5432/sisfs
JWT_SECRET=your-secret-key
FRONTEND_URL=https://greenhybridpower.in
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ADMIN_EMAIL=admin@greenhybridpower.in
ADMIN_PASSWORD=Admin@123
```

5. Run database migrations:
```bash
npm run migrate
```

6. Seed the database:
```bash
npm run seed
```

7. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
VITE_API_BASE_URL=https://solar-app-5l4i.onrender.com/api
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/leads` - Lead management
- `/api/bookings` - Site inspections
- `/api/quotations` - Quotations
- `/api/plans` - Solar plans
- `/api/installations` - Installation tracking
- `/api/payments` - Payment management
- `/api/service-requests` - Service tickets
- `/api/monitoring` - Energy monitoring
- `/api/admin` - Admin dashboard
- `/api/system` - System health

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| DATABASE_URL | PostgreSQL connection string |
| JWT_SECRET | JWT signing secret |
| FRONTEND_URL | Frontend domain |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |

### Frontend
| Variable | Description |
|----------|-------------|
| VITE_API_BASE_URL | Backend API URL |

## Default Admin Credentials

- Email: admin@greenhybridpower.in
- Password: Admin@123

## Scripts

### Backend
```bash
npm run dev       # Start development server
npm run migrate  # Run database migrations
npm run seed     # Seed database with initial data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## License

MIT License
