import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'pagination',
    initialState: { currentPage: 1 },
    reducers: {
      next: (state, action) => {
        state.currentPage += 1;
      },
      prev: (state, action) => {
        state.currentPage = Math.max(state.currentPage - 1, 1);
      },
      reset: (state) => {
        state.currentPage = 1;
      },
    },
  });
  
  export const { next, prev, reset } = pageSlice.actions;
  export default pageSlice.reducer;