import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  RESET_ORDER_STATE,
} from "./actionTypes";

const initialState = {
  loading: false,
  order: null,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload, error: null };
    case CREATE_ORDER_FAILURE:
      return { loading: false, order: null, error: action.payload };
    case RESET_ORDER_STATE:
      return initialState;
    default:
      return state;
  }
};

export default orderReducer;
