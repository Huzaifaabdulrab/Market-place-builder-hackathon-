// redux/cartslice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypeData {
  _id: string;
  name: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  originalPrice?: string; 
  tags?: string[];
}


const cartSlice = createSlice({
  name: "Cart",
  initialState: [] as TypeData[], // Initial state is an empty array of TypeData
  reducers: {
    add(state, action: PayloadAction<TypeData>) {
      state.push(action.payload); // Adds the item to the cart
    },
    remove(state, action: PayloadAction<string>) { // PayloadAction<string> to match _id as string
      // Filters out the item by its _id
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions; // Export actions
export default cartSlice.reducer; // Export the reducer to be used in the store
