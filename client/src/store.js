import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import pageReducer from './features/page/pageSlice';
import categoryReducer from './features/menu/categorySlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    pagination: pageReducer,
    category: categoryReducer
  },
  preloadedState: loadState(),
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
