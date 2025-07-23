# SuperNova - E-commerce Platform

A modern e-commerce platform built with Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- User authentication and registration
- Product catalog and shopping cart
- Admin dashboard for product management
- Responsive design with Tailwind CSS
- Flash messaging system
- User profiles and order management

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd supernova
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   EXPRESS_SESSION_SECRET=your_session_secret_here
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Build the CSS (required for production):
   ```bash
   npm run build-css-prod
   ```

5. Start the application:
   ```bash
   node app.js
   ```

The application will be available at `http://localhost:3000`

## Development

### CSS Development

This project uses Tailwind CSS v4 for styling. The CSS is compiled from source files.

- **Source CSS**: `src/input.css`
- **Output CSS**: `public/css/style.css`
- **Config**: `tailwind.config.js`

#### Available Scripts

- `npm run build-css`: Build CSS with watch mode for development
- `npm run build-css-prod`: Build minified CSS for production

#### Development Workflow

1. For development with auto-rebuild:
   ```bash
   npm run build-css
   ```

2. Make changes to `src/input.css` or any template files
3. The CSS will automatically rebuild when files change

#### Production Deployment

Always run the production build before deploying:
```bash
npm run build-css-prod
```

This ensures:
- Minified CSS for better performance
- All unused styles are purged
- Optimal file size for production

## Project Structure

```
supernova/
├── app.js                 # Main application file
├── config/               # Configuration files
├── controllers/          # Route controllers
├── middlewares/          # Custom middleware
├── models/              # MongoDB models
├── public/              # Static assets
│   ├── css/            # Compiled CSS
│   └── images/         # Image assets
├── routes/              # Route definitions
├── src/                 # Source files
│   └── input.css       # Tailwind CSS source
├── utils/               # Utility functions
├── views/               # EJS templates
│   └── partials/       # Reusable template parts
└── package.json
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templating, Tailwind CSS v4
- **Authentication**: JWT, bcrypt
- **Session Management**: express-session
- **File Upload**: Multer
- **Flash Messages**: connect-flash

## License

ISC License
