import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null, 
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    resetCategory(state) {
      state.selectedCategory = initialState.selectedCategory;
    },    
  },
});

export const { setCategory, resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
