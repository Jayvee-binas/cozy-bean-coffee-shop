# The Cozy Bean - React Single Page Application

A modern coffee shop website built with React, featuring dynamic routing, database integration, and a beautiful responsive design.

## Features

- **Single Page Application (SPA)** with React Router DOM
- **5 Main Sections**: Home, About, Menu, Order, Contact
- **Dynamic Routing** with nested routes and protected routes
- **Database Integration** using JSON Server
- **Responsive Design** with Bootstrap and custom CSS
- **Shopping Cart** functionality
- **Order Management** system
- **Contact Form** with database storage
- **Admin Dashboard** for order and contact management
- **404 Page** handling

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── CartModal.js       # Shopping cart modal
│   └── ProtectedRoute.js   # Admin route protection
├── pages/
│   ├── Home.js            # Homepage
│   ├── About.js           # About page
│   ├── Menu.js            # Coffee menu
│   ├── Order.js           # Order form
│   ├── Contact.js         # Contact form
│   ├── Admin.js           # Admin dashboard
│   └── NotFound.js        # 404 page
├── services/
│   └── api.js             # API service functions
├── App.js                 # Main app component
├── index.js               # App entry point
└── index.css              # Global styles
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start JSON Server** (Database)
   ```bash
   npx json-server --watch db.json --port 3001
   ```

3. **Start React Development Server**
   ```bash
   npm start
   ```

4. **Access the Application**
   - Main App: http://localhost:3000
   - Database API: http://localhost:3001
   - Admin Dashboard: http://localhost:3000/admin (password: admin123)

## Features Implementation

### 1. React Router DOM
- **Dynamic Routing**: 5 main routes (/, /about, /menu, /order, /contact)
- **Protected Routes**: Admin dashboard with password protection
- **404 Handling**: Custom NotFound component for invalid routes
- **Navigation**: Header component with React Router Link components

### 2. Database Integration
- **JSON Server**: RESTful API for data persistence
- **Orders**: Store customer orders with full details
- **Contacts**: Store contact form submissions
- **Reservations**: Store table reservation requests
- **Admin Dashboard**: View and manage all data

### 3. Component Architecture
- **Header**: Navigation with cart functionality
- **CartModal**: Shopping cart with add/remove/update functionality
- **ProtectedRoute**: Admin access control
- **Page Components**: Individual pages for each route

### 4. Styling & UI
- **Bootstrap 5**: Responsive grid system and components
- **Custom CSS**: Coffee shop theme with warm colors
- **Font Awesome**: Icons throughout the application
- **Responsive Design**: Mobile-first approach

## Database Schema

### Orders
```json
{
  "id": 1,
  "orderName": "Customer Name",
  "orderPhone": "Phone Number",
  "orderEmail": "Email Address",
  "orderType": "Coffee Type",
  "orderSize": "Size",
  "orderQuantity": 1,
  "orderMilk": "Milk Preference",
  "orderSugar": "Sugar Level",
  "orderNotes": "Special Instructions",
  "pickupTime": "Time",
  "orderDate": "ISO Date",
  "status": "pending/preparing/ready"
}
```

### Contacts
```json
{
  "id": 1,
  "name": "Full Name",
  "email": "Email Address",
  "phone": "Phone Number",
  "subject": "Subject Category",
  "message": "Message Content",
  "date": "ISO Date",
  "status": "new/read/replied"
}
```

## Usage

1. **Browse Menu**: View coffee items with size options and pricing
2. **Add to Cart**: Select items and sizes, add to shopping cart
3. **Place Order**: Fill out order form with customer details
4. **Contact Us**: Send messages through contact form
5. **Admin Access**: Manage orders and contacts (password: admin123)

## Development

- **React 18**: Latest React features
- **React Router DOM 6**: Modern routing
- **Bootstrap 5**: UI framework
- **JSON Server**: Mock database
- **Axios**: HTTP client (optional)

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service

3. Set up a real database (MongoDB, PostgreSQL, etc.) to replace JSON Server

## License

This project is created for educational purposes as part of a React SPA lab assignment.
