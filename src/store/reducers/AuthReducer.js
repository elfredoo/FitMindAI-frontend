const initialState = {
  user: null,
  userOrders: [],
  address: [],
  clientSecret: null,
  selectedUserAddress: null,
  sellerProducts: [],
  recentSales: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "USER_ADDRESS":
      return { ...state, address: action.payload };
    case "SELECT_ADDRESS":
      return { ...state, selectedUserAddress: action.payload };
    case "REMOVE_SELECTED_ADDRESS":
      return { ...state, selectedUserAddress: null };
    case "LOG_OUT":
      return {
        user: null,
        address: null,
      };
    case "CLIENT_SECRET":
      return { ...state, clientSecret: action.payload };
    case "REMOVE_CLIENT_SECRET_ADDRESS":
      return { ...state, clientSecret: null, selectedUserAddress: null };
    case "FETCH_ORDERS":
      return {
        ...state,
        userOrders: action.payload,
      };
    case "FETCH_SELLER_PRODUCTS":
      return {
        ...state,
        sellerProducts: action.payload,
      };
    case "FETCH_RECENT_SALES":
      return {
        ...state,
        recentSales: action.payload,
      };
    default:
      return state;
  }
};
