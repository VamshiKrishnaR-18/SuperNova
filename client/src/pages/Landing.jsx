import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FlashMessage from '../components/FlashMessage';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

const Landing = () => {
  const { isAuthenticated, login, register } = useAuth();
  const [messages, setMessages] = useState({ error: [], success: [] });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/shop" replace />;
  }

  const handleFormSubmit = async (formData, type) => {
    try {
      let response;
      if (type === 'register') {
        response = await register(formData);
      } else {
        response = await login(formData);
      }

      if (response.success) {
        setMessages({
          error: [],
          success: [response.message || `${type === 'register' ? 'Registration' : 'Login'} successful!`]
        });
        // Navigation will happen automatically due to auth state change
      }
    } catch (error) {
      setMessages({
        error: [error.message || `${type === 'register' ? 'Registration' : 'Login'} failed!`],
        success: []
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Flash Messages */}
      <FlashMessage messages={messages.error} type="error" />
      <FlashMessage messages={messages.success} type="success" />

      {/* Main Container */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Registration Section */}
        <RegistrationForm onSubmit={handleFormSubmit} />
        
        <div className="flex items-center justify-center text-2xl font-bold py-10">
          <h1>OR</h1>
        </div>
        
        {/* Login Section */}
        <LoginForm onSubmit={handleFormSubmit} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
