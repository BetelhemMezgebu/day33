function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          ...action.payload,
          cartId: Date.now(),
        },
      ];

    case "REMOVE":
      return state.filter(
        (item) => item.cartId !== action.payload
      );

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export default cartReducer;