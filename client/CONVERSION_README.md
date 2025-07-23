# EJS to React Conversion

This document outlines the conversion of the SuperNova application from EJS templates to React components.

## What Was Converted

The original EJS template (`server/views/index.ejs`) has been converted to a modern React application with the following components:

### Components Created

1. **App.jsx** - Main application component that manages state and handles form submissions
2. **FlashMessage.jsx** - Displays success/error messages with auto-fade functionality
3. **RegistrationForm.jsx** - User registration form with validation
4. **LoginForm.jsx** - User login form with validation
5. **Footer.jsx** - Application footer with social media links

### Features Implemented

- ✅ Responsive design using Tailwind CSS
- ✅ Flash message system with auto-fade (3 seconds)
- ✅ Form validation and loading states
- ✅ API integration for user registration and login
- ✅ Custom styling matching the original EJS design
- ✅ Google Fonts (Condiment) integration
- ✅ Remixicon for social media icons

### API Integration

The React app communicates with the backend server through:
- **Registration endpoint**: `POST /users/register`
- **Login endpoint**: `POST /users/login`

API service is configured to use environment variables for the base URL.

### Styling

- Maintained all original custom CSS classes (`.input-field`, `.btn-primary`, `.supernova`)
- Added loading states and disabled button styling
- Preserved the original color scheme and layout

### Environment Configuration

- Created `.env` file for API URL configuration
- Default API URL: `http://localhost:3000`

## Running the React Application

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5174` (or another port if 5174 is in use)

## Key Differences from EJS

1. **State Management**: React uses useState hooks for form data and flash messages
2. **Event Handling**: Form submissions are handled with JavaScript instead of traditional form posts
3. **Component Structure**: Modular components instead of a single template file
4. **API Communication**: Fetch API for asynchronous communication with the backend
5. **Loading States**: Added visual feedback during form submissions

## Next Steps

To fully integrate this React frontend:

1. Update the backend to serve the React build files
2. Configure CORS for API endpoints
3. Update routing to handle React's client-side routing
4. Consider adding React Router for multi-page navigation
5. Add proper error handling and validation feedback

## File Structure

```
client/
├── src/
│   ├── components/
│   │   ├── FlashMessage.jsx
│   │   ├── RegistrationForm.jsx
│   │   ├── LoginForm.jsx
│   │   └── Footer.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── .env
└── package.json
```
