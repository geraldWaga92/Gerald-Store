import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

// this cartSlice function acts as the reducer or bridge to connect with our product page and our Cart component
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //using this action we can get the data from product and store that data into our initialState product array
    addToCart: (state, action) => {

      // this means that we find the state of our products if the product item id is thesame with the action payload id then that item already exist
      const item = state.products.find(item => item.id === action.payload.id)

      // this condition state that the item will be equal or increment when the action payload is clicked so when we clicked on the add to cart
      //button then the item will increment by one on our cart page 
      if (item) {
        item.quantity+=action.payload.quantity
      } else {
        state.products.push(action.payload);
      }
    },
    // this basically delete the item when we clicked the delete icon
    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload)
    },
    // reset our cart
    resetCart: (state) => {
      state.products = []
    }
  }
})

//we can then use this actions to our store.js
export const {addToCart, removeItem,  resetCart } = cartSlice.actions

export default cartSlice.reducer