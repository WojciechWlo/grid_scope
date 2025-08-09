// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  UserLoginState } from '../interfaces/userInterfaces';

const initialState: UserLoginState = {};

const userLoginSlice = createSlice({
	name: 'userLogin',
	initialState,
	reducers: {
		userLoginRequest(state) {
			state.loading = true;
			state.error = undefined;
		},
		userLoginSuccess(state, action: PayloadAction) {
			state.loading = false;
			state.userInfo = action.payload;
		},
		userLoginFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		userLogout(state) {
			return {};
		},
	},
});

export const {
	userLoginRequest,
	userLoginSuccess,
	userLoginFail,
	userLogout,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;