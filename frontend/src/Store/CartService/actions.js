import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  HIDE_CART_TOAST,
  LOAD_CART_REQUEST,
  LOAD_CART_SUCCESS,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  SHOW_CART_TOAST,
  UPDATE_CART_QUANTITY_REQUEST,
  UPDATE_CART_QUANTITY_SUCCESS,
} from "./actionTypes";

export const addToCart = (payload) => ({
  type: ADD_TO_CART_REQUEST,
  payload,
});

export const addToCartSuccess = (items) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: items,
});

export const removeFromCart = (lineItemId) => ({
  type: REMOVE_FROM_CART_REQUEST,
  payload: { id: lineItemId },
});

export const removeFromCartSuccess = (items) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: items,
});

export const updateCartQuantity = (lineItemId, quantity) => ({
  type: UPDATE_CART_QUANTITY_REQUEST,
  payload: { id: lineItemId, quantity },
});

export const updateCartQuantitySuccess = (items) => ({
  type: UPDATE_CART_QUANTITY_SUCCESS,
  payload: items,
});

export const clearCart = () => ({
  type: CLEAR_CART_REQUEST,
});

export const clearCartSuccess = () => ({
  type: CLEAR_CART_SUCCESS,
});

export const loadCart = () => ({
  type: LOAD_CART_REQUEST,
});

export const loadCartSuccess = (items) => ({
  type: LOAD_CART_SUCCESS,
  payload: items,
});

export const showCartToast = (toastInfo) => ({
  type: SHOW_CART_TOAST,
  payload: toastInfo,
});

export const hideCartToast = () => ({
  type: HIDE_CART_TOAST,
});
