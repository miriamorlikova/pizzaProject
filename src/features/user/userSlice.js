import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding.js';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// 1) We get the user's geolocation position

export const fetchAdress = createAsyncThunk(
  'user/fetchAdress',

  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);

    const street = addressObj?.street || '';
    const number = addressObj?.number || '';
    const city = addressObj?.city || '';
    const postcode = addressObj?.postcode || '';
    const country = addressObj?.countryName || '';

    const address = `${street}, ${number}, ${city} ${postcode}, ${country}`;

    // const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    //this is the payload of the FULLFILED STATE
    return { position, address };
  },
);

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  adress: '',
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
      .addCase(fetchAdress.pending, (state, action) => {
        state.status = 'loading';
      }) //be carefull to really place the curly braces here, if not, you are returning something from pending state and it gets imediatelly rejected, this is REDUCER, so you need to return mutated or non mutated state back

      .addCase(fetchAdress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.adress = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAdress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      }),
});

export const getName = (state) => state.user.username;

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
