const CART_STORAGE_KEY = "cosmiccrate_cart";

/**
 * Load cart items from localStorage.
 * Returns an array of cart line items.
 */
export function loadCartFromStorage() {
  try {
    const rawData = localStorage.getItem(CART_STORAGE_KEY);
    if (!rawData) {
      return [];
    }
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
}

/**
 * Save cart items to localStorage.
 * @param {Array} cartItems 
 */
export function saveCartToStorage(cartItems) {
  try {
    if (!Array.isArray(cartItems)) {
      return;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
}

/**
 * Clear cart from localStorage.
 */
export function clearCartFromStorage() {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear cart from localStorage:", error);
  }
}
