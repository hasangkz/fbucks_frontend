import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketItems: localStorage.getItem('basket')
    ? // @ts-ignore
      JSON.parse(localStorage.getItem('basket')).basketItems
    : [],
  total: localStorage.getItem('basket')
    ? // @ts-ignore
      JSON.parse(localStorage.getItem('basket')).total
    : 0,
  tax: 8,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existAlreadyItem = state.basketItems.find(
        // @ts-ignore
        (item) => item._id === action.payload._id
      );
      if (!existAlreadyItem) {
        // @ts-ignore
        state.basketItems.unshift({ ...action.payload, quantity: 1 });
      } else {
        // @ts-ignore
        existAlreadyItem.quantity += 1;
      }
      state.total += action.payload.price;
    },
    deleteProduct: (state, action) => {
      let newBasketItems = state.basketItems.filter(
        // @ts-ignore
        (item) => item._id !== action.payload._id
      );
      state.basketItems = newBasketItems;
      state.total -= action.payload.price * action.payload.quantity;
    },
    plusProduct: (state, action) => {
      const product = state.basketItems.find(
        // @ts-ignore
        (item) => item._id === action.payload._id
      );
      // @ts-ignore
      product.quantity += 1;
      // @ts-ignore
      state.total += product.price;
    },
    minusProduct: (state, action) => {
      const product = state.basketItems.find(
        // @ts-ignore
        (item) => item._id === action.payload._id
      );
      // @ts-ignore
      product.quantity -= 1;
      // @ts-ignore
      state.total -= product.price;
    },
    emptyBasket: (state) => {
      state.basketItems = [];
      state.total = 0;
    },
  },
});
export const {
  addProduct,
  plusProduct,
  minusProduct,
  deleteProduct,
  emptyBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
