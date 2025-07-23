const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const fetchWithCredentials = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const apiService = {
  async register(userData) {
    return fetchWithCredentials(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async login(userData) {
    return fetchWithCredentials(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async logout() {
    return fetchWithCredentials(`${API_BASE_URL}/logout`, {
      method: 'POST',
    });
  },

  async getProfile() {
    return fetchWithCredentials(`${API_BASE_URL}/profile`);
  },

  async getProducts() {
    return fetchWithCredentials(`${API_BASE_URL}/shop`);
  },

  async getCart() {
    return fetchWithCredentials(`${API_BASE_URL}/cart`);
  },

  async addToCart(productId) {
    return fetchWithCredentials(`${API_BASE_URL}/addToCart/${productId}`, {
      method: 'POST',
    });
  },

  async updateCartQuantity(itemId, operation) {
    return fetchWithCredentials(`${API_BASE_URL}/cart/${operation}/${itemId}`, {
      method: 'POST',
    });
  },

  async getAbout() {
    return fetchWithCredentials(`${API_BASE_URL}/about`);
  },

  // Admin endpoints
  async getAdminDashboard() {
    return fetchWithCredentials(`${API_BASE_URL}/owners/adminDashboard`);
  },

  async createProduct(formData) {
    const response = await fetch(`${API_BASE_URL}/products/create`, {
      method: 'POST',
      credentials: 'include',
      body: formData, // FormData for file upload
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Product creation failed');
    }

    return data;
  },

  async updateProduct(productId, formData) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/edit`, {
      method: 'POST',
      credentials: 'include',
      body: formData, // FormData for file upload
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Product update failed');
    }

    return data;
  },

  async deleteProducts(productIds) {
    return fetchWithCredentials(`${API_BASE_URL}/owners/deleteProducts`, {
      method: 'POST',
      body: JSON.stringify({ ids: productIds }),
    });
  },

  async getProductForEdit(productId) {
    return fetchWithCredentials(`${API_BASE_URL}/owners/editItem/${productId}/edit`);
  }
};
