import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isHata: false,
  isBasari: false,
  isYukleniyor: false,
  mesaj: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const mesaj =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(mesaj);
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const mesaj =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(mesaj);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isHata = false;
      state.isYukleniyor = false;
      state.isBasari = false;
      state.mesaj = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isYukleniyor = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isYukleniyor = false;
        state.isBasari = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isYukleniyor = false;
        state.isHata = true;
        // @ts-ignore
        state.mesaj = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isYukleniyor = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isYukleniyor = false;
        state.isBasari = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isYukleniyor = false;
        state.isHata = true;
        // @ts-ignore
        state.mesaj = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
