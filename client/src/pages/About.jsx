import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const About = () => {
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await apiService.getAbout();
      if (response.success) {
        setOwnerData(response.owner);
      }
    } catch (error) {
      console.error('Failed to load about data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-10 py-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 py-20">
      <div className="bg-white shadow-md rounded-lg p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Welcome to our platform! - <span className="supernova text-lg font-bold">SuperNova</span> is 
          a premium shopping platform dedicated to providing a seamless and luxurious shopping experience. 
          We bring together the finest collection of high-quality products, carefully curated to match the 
          tastes and preferences of modern, discerning customers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          At SuperNova, our mission is to revolutionize the online shopping experience by offering 
          premium products with exceptional customer service. We believe that shopping should be 
          enjoyable, convenient, and trustworthy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>Carefully curated premium products</li>
          <li>Secure and fast checkout process</li>
          <li>Excellent customer support</li>
          <li>Fast and reliable delivery</li>
          <li>Easy returns and exchanges</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl mb-3">🌟</div>
            <h3 className="font-semibold mb-2">Quality</h3>
            <p className="text-sm text-gray-600">
              We never compromise on the quality of our products and services.
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold mb-2">Trust</h3>
            <p className="text-sm text-gray-600">
              Building lasting relationships through transparency and reliability.
            </p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2">Innovation</h3>
            <p className="text-sm text-gray-600">
              Continuously improving our platform and user experience.
            </p>
          </div>
        </div>

        {ownerData && (
          <div className="border-t pt-8">
            
            <div className="flex items-center space-x-6">
              <img
                src={ownerData.picture || '/images/default-avatar.png'}
                alt="Owner"
                className="w-20 h-20 rounded-full border-2 border-gray-300"
              />
              <div>
                <h3 className="text-xl font-semibold">{ownerData.fullname}</h3>
                <p className="text-gray-600">{ownerData.email}</p>
                <p className="text-sm text-gray-500 mt-1">Developer</p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Get in Touch</h3>
              <p className="text-gray-600 mb-2">
                Email: <a href="mailto:support@supernova.com" className="text-blue-500 hover:underline">
                  support@supernova.com
                </a>
              </p>
              <p className="text-gray-600">
                Phone: <span className="text-blue-500">xxxxxxxxxx</span>
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  <i className="ri-facebook-fill text-xl"></i>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-600">
                  <i className="ri-instagram-fill text-xl"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-500">
                  <i className="ri-twitter-fill text-xl"></i>
                </a>
                <a href="#" className="text-blue-700 hover:text-blue-800">
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
