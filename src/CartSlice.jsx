import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
      } else {
        state.items.push({ name, image, cost, quantity: 1 }); // Add new item with quantity 1
      }
      // Optionally, you can also sort items by name or cost here if needed
      state.items.sort((a, b) => a.name.localeCompare(b.name)); // Sort items by name
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      state.items = state.items.filter((item) => item.name !== name); // Remove item by name
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity; // Update quantity if item exists
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.name !== name); // Remove item if quantity is 0 or less
        }
      }
      // Optionally, you can also sort items by name or cost here if needed
      state.items.sort((a, b) => a.name.localeCompare(b.name)); // Sort items by name
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
