import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import orderReducer from "./OrderService/reducer";
import orderSaga from "./OrderService/saga";
import cartReducer from "./CartService/reducer";
import cartSaga from "./CartService/saga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([fork(orderSaga), fork(cartSaga)]);
}

const store = createStore(
  combineReducers({
    order: orderReducer,
    cart: cartReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

