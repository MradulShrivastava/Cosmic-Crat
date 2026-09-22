import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import orderReducer from "./OrderService/reducer";
import orderSaga from "./OrderService/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ order: orderReducer }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(orderSaga);

export default store;
