import { put, select, takeLatest } from "redux-saga/effects";
import {
  clearCartFromStorage,
  loadCartFromStorage,
  saveCartToStorage,
} from "../../lib/cartStorage";
import {
  addToCartSuccess,
  clearCartSuccess,
  loadCartSuccess,
  removeFromCartSuccess,
  showCartToast,
  updateCartQuantitySuccess,
} from "./actions";
import {
  ADD_TO_CART_REQUEST,
  CLEAR_CART_REQUEST,
  LOAD_CART_REQUEST,
  REMOVE_FROM_CART_REQUEST,
  UPDATE_CART_QUANTITY_REQUEST,
} from "./actionTypes";

const getCartItems = (state) => state.cart.items;

function* handleAddToCart(action) {
  try {
    const currentItems = yield select(getCartItems);
    const payload = action.payload;

    const existingIndex = currentItems.findIndex(
      (item) =>
        item.productId === payload.productId &&
        item.variantId === payload.variantId &&
        (item.personalization || "") === (payload.personalization || "")
    );

    let updatedItems;
    if (existingIndex > -1) {
      updatedItems = currentItems.map((item, index) => {
        if (index === existingIndex) {
          return {
            ...item,
            quantity: item.quantity + (payload.quantity || 1),
          };
        }
        return item;
      });
    } else {
      const newLineItem = {
        id: `${payload.productId}_${payload.variantId}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        productId: payload.productId,
        variantId: payload.variantId || payload.variantName,
        productName: payload.productName,
        variantName: payload.variantName || payload.variantId,
        quantity: payload.quantity || 1,
        unitPrice: Number(payload.unitPrice || 0),
        image: payload.image || null,
        personalization: payload.personalization || null,
        collection: payload.collection || "Gift Box",
        zodiacSign: payload.zodiacSign || null,
      };
      updatedItems = [...currentItems, newLineItem];
    }

    saveCartToStorage(updatedItems);
    yield put(addToCartSuccess(updatedItems));
    yield put(
      showCartToast({
        productName: payload.productName,
        variantName: payload.variantName,
        quantity: payload.quantity || 1,
      })
    );
  } catch (error) {
    console.error("Saga error in handleAddToCart:", error);
  }
}

function* handleRemoveFromCart(action) {
  try {
    const currentItems = yield select(getCartItems);
    const updatedItems = currentItems.filter((item) => item.id !== action.payload.id);
    saveCartToStorage(updatedItems);
    yield put(removeFromCartSuccess(updatedItems));
  } catch (error) {
    console.error("Saga error in handleRemoveFromCart:", error);
  }
}

function* handleUpdateCartQuantity(action) {
  try {
    const { id, quantity } = action.payload;
    if (quantity < 1) return; // Minimum quantity rule: 1

    const currentItems = yield select(getCartItems);
    const updatedItems = currentItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });

    saveCartToStorage(updatedItems);
    yield put(updateCartQuantitySuccess(updatedItems));
  } catch (error) {
    console.error("Saga error in handleUpdateCartQuantity:", error);
  }
}

function* handleClearCart() {
  try {
    clearCartFromStorage();
    yield put(clearCartSuccess());
  } catch (error) {
    console.error("Saga error in handleClearCart:", error);
  }
}

function* handleLoadCart() {
  try {
    const items = loadCartFromStorage();
    yield put(loadCartSuccess(items));
  } catch (error) {
    console.error("Saga error in handleLoadCart:", error);
  }
}

export default function* cartSaga() {
  yield takeLatest(ADD_TO_CART_REQUEST, handleAddToCart);
  yield takeLatest(REMOVE_FROM_CART_REQUEST, handleRemoveFromCart);
  yield takeLatest(UPDATE_CART_QUANTITY_REQUEST, handleUpdateCartQuantity);
  yield takeLatest(CLEAR_CART_REQUEST, handleClearCart);
  yield takeLatest(LOAD_CART_REQUEST, handleLoadCart);
}
