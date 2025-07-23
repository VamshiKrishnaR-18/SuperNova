import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import FlashMessage from '../components/FlashMessage';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState({ error: [], success: [] });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await apiService.getCart();
      if (response.success) {
        setCartItems(response.items);
      }
    } catch (error) {
      setMessages({
        error: [error.message || 'Failed to load cart'],
        success: []
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, operation) => {
    try {
      const response = await apiService.updateCartQuantity(itemId, operation);
      if (response.success) {
        setMessages({
          error: [],
          success: [response.message]
        });
        // Refresh cart after update
        await fetchCart();
      }
    } catch (error) {
      setMessages({
        error: [error.message || 'Failed to update quantity'],
        success: []
      });
    }
  };

  const calculateTotals = () => {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + ((item.discount || 0) * item.quantity), 0);
    return { totalPrice, totalDiscount };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-10 py-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading cart...</div>
        </div>
      </div>
    );
  }

  const { totalPrice, totalDiscount } = calculateTotals();

  return (
    <>
      {/* Flash Messages */}
      <FlashMessage messages={messages.error} type="error" />
      <FlashMessage messages={messages.success} type="success" />

      <div className="container mx-auto px-10 py-20">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="w-full bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link to="/shop" className="text-blue-500 hover:text-blue-600 transition-colors">
              ← Back to shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full md:w-2/3">
              <div className="grid gap-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div 
                      className="w-full md:w-32 h-32 flex items-center justify-center rounded-lg"
                      style={{ backgroundColor: item.bgcolor || '#f3f4f6' }}
                    >
                      <img
                        className="h-24 object-contain"
                        src={`data:${item.image.contentType};base64,${item.image.data}`}
                        alt={item.name}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {item.description || 'No description available'}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mb-4">
                        <button
                          onClick={() => updateQuantity(item._id, 'decrease')}
                          className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 bg-gray-100 rounded-md text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, 'increase')}
                          className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-lg font-semibold">
                            ₹{(item.price - (item.discount || 0)) * item.quantity}
                          </span>
                          {item.discount > 0 && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{item.price * item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{totalDiscount}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>₹{totalPrice - totalDiscount}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-700 transition-all">
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
