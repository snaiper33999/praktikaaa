export const ADD_TO_CART = 'ADD_TO_CART';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';  // Добавляем действие для удаления товара



export const CLEAR_CART = "CLEAR_CART";

export const clearCart = () => ({
  type: CLEAR_CART,
});




// Действие добавления товара в корзину
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

// Действие уменьшения количества товара
export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

// Действие удаления товара из корзины
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
