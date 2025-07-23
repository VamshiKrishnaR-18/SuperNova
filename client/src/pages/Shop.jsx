import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import FlashMessage from '../components/FlashMessage';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState({ error: [], success: [] });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiService.getProducts();
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      setMessages({
        error: [error.message || 'Failed to load products'],
        success: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await apiService.addToCart(productId);
      if (response.success) {
        setMessages({
          error: [],
          success: [response.message]
        });
      }
    } catch (error) {
      setMessages({
        error: [error.message || 'Failed to add item to cart'],
        success: []
      });
    }
  };

  const calculateDiscount = (price, discount) => {
    return discount ? +((discount / price) * 100).toFixed(2) : 0;
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (discount || 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-10 py-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Flash Messages */}
      <FlashMessage messages={messages.error} type="error" />
      <FlashMessage messages={messages.success} type="success" />

      <div className="container mx-auto flex gap-8 px-10 py-20 mt-10">
        {/* Sidebar */}
        <aside className="w-[200px] sticky top-20 h-[70vh] overflow-y-auto bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sort by</h3>
          <select className="border px-2 py-1 w-full rounded-md mb-6">
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
          </select>

          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <a className="block mb-2 hover:text-blue-500 cursor-pointer">New Collection</a>
          <a className="block mb-2 hover:text-blue-500 cursor-pointer">All Products</a>
          <a className="block mb-2 hover:text-blue-500 cursor-pointer">Discounted Products</a>

          <h3 className="text-lg font-semibold mb-4 mt-8">Filter by</h3>
          <a className="block mb-2 hover:text-blue-500 cursor-pointer">Availability</a>
          <a className="block mb-2 hover:text-blue-500 cursor-pointer">Discount</a>
        </aside>

        {/* Product Grid */}
        <main className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ml-10">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <h2 className="text-2xl font-bold mb-4">No products available</h2>
              <p className="text-gray-600">Check back later for new products!</p>
            </div>
          ) : (
            products.map((product) => {
              const discountPercentage = calculateDiscount(product.price, product.discount);
              const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

              return (
                <div
                  key={product._id}
                  className="flex flex-col bg-white rounded-md shadow-lg overflow-hidden mb-8 h-[300px]"
                >
                  <div
                    className="h-60 flex items-center justify-center"
                    style={{ backgroundColor: product.bgcolor || '#f3f4f6' }}
                  >
                    <img
                      className="h-48 object-contain"
                      src={`data:${product.image.contentType};base64,${product.image.data}`}
                      alt={product.name}
                    />
                  </div>
                  <div
                    className="p-4 flex justify-between items-center"
                    style={{ 
                      backgroundColor: product.panelcolor || '#ffffff',
                      color: product.textcolor || '#000000'
                    }}
                  >
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="flex flex-row gap-3">
                        {discountPercentage > 0 && (
                          <h4 className="text-sm text-red-500 flex items-center justify-center">
                            -{discountPercentage}%
                          </h4>
                        )}
                        <h4 className="text-lg font-semibold">₹{discountedPrice}</h4>
                      </div>
                      <h4 className="text-xs opacity-75">M.R.P: ₹{product.price}</h4>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-700 shadow hover:bg-gray-200 transition-colors"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>
    </>
  );
};

export default Shop;
