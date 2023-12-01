import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  fisrt_name: string;
  last_name: string;
  roles: string[];
}

const initialState: UserState = {
  id: '',
  fisrt_name: 'dummy',
  last_name: 'mc. dummy',
  roles: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fisrt_name = action.payload.fisrt_name;
      state.last_name = action.payload.last_name;
      state.roles = action.payload.roles;
    },
    emptyUser: (state) => {
      state.id = '';
      state.fisrt_name = '';
      state.last_name = '';
      state.roles = [];
    },
  },
});

export const { setUser, emptyUser } = userSlice.actions;

export default userSlice.reducer;
