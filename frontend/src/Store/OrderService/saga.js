import { call, put, takeLatest } from "redux-saga/effects";
import { createOrderFailure, createOrderSuccess } from "./actions";
import { CREATE_ORDER_REQUEST } from "./actionTypes";
import { submitOrder } from "../../service/orderService";

function getErrorMessage(error) {
  return error.response?.data?.message || error.message || "We could not place your order right now. Please try again.";
}

export function* createOrderSaga(action) {
  try {
    const order = yield call(submitOrder, action.payload);
    yield put(createOrderSuccess(order));
  } catch (error) {
    yield put(createOrderFailure(getErrorMessage(error)));
  }
}

export default function* orderSaga() {
  yield takeLatest(CREATE_ORDER_REQUEST, createOrderSaga);
}
