import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

// Encapsulate geolocation retrieval into a separate function
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Create async thunk using createAsyncThunk's payload creator
export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  try {
    const positionObj = await getPosition();
    const { latitude, longitude } = positionObj.coords;

    const addressObj = await getAddress({ latitude, longitude });
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position: { latitude, longitude }, address };
  } catch (error) {
    throw new Error(
      'Failed to fetch address. Please ensure location services are enabled.'
    );
  }
});

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch address.';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
