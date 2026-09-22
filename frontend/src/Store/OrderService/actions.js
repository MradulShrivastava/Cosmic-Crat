import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  RESET_ORDER_STATE,
} from "./actionTypes";

export const createOrder = (payload) => ({
  type: CREATE_ORDER_REQUEST,
  payload,
});

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

export const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

export const resetOrderState = () => ({
  type: RESET_ORDER_STATE,
});
