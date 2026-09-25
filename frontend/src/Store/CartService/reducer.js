import { loadCartFromStorage } from "../../lib/cartStorage";
import {
  ADD_TO_CART_SUCCESS,
  CLEAR_CART_SUCCESS,
  HIDE_CART_TOAST,
  LOAD_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
  SHOW_CART_TOAST,
  UPDATE_CART_QUANTITY_SUCCESS,
} from "./actionTypes";

const initialState = {
  items: loadCartFromStorage(),
  toast: {
    show: false,
    productName: "",
    variantName: "",
    quantity: 1,
  },
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
    case REMOVE_FROM_CART_SUCCESS:
    case UPDATE_CART_QUANTITY_SUCCESS:
    case LOAD_CART_SUCCESS:
      return {
        ...state,
        items: action.payload,
        error: null,
      };

    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        items: [],
        error: null,
      };

    case SHOW_CART_TOAST:
      return {
        ...state,
        toast: {
          show: true,
          productName: action.payload.productName || "",
          variantName: action.payload.variantName || "",
          quantity: action.payload.quantity || 1,
        },
      };

    case HIDE_CART_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          show: false,
        },
      };

    default:
      return state;
  }
};

export default cartReducer;
