// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  
	UserLoginState,
	AuthTokensState,
} from '../interfaces/userInterfaces';

const initialUserInfoState: UserLoginState = {};

const userLoginSlice = createSlice({
	name: 'userLogin',
	initialState:initialUserInfoState,
	reducers: {
		userLoginRequest(state) {
			state.loading = true;
			state.error = undefined;
		},
		userLoginSuccess(state, action: PayloadAction) {
			if (JSON.stringify(state.userInfo) === JSON.stringify(action.payload)) {
				return;
			}
			state.loading = false;
			state.userInfo = action.payload;
			state.error = undefined;
		},
		userLoginFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		userLogout(state) {
			state.userInfo = undefined;
			state.loading = false;
			state.error = undefined;			
		},
	},
});

export const {
	userLoginRequest,
	userLoginSuccess,
	userLoginFail,
	userLogout,
} = userLoginSlice.actions;

export const userLoginReducer = userLoginSlice.reducer;


const initialTokensState: AuthTokensState = {};

const authTokensUpdateSlice = createSlice({
	name: 'authTokens',
	initialState:initialTokensState,
	reducers: {
		authTokensUpdateRequest(state) {
			state.loading = true;
			state.error = undefined;
		},
		authTokensUpdateSuccess(state, action: PayloadAction<AuthTokensState>) {
			state.loading = false;
			state.tokens = action.payload;

		},
		authTokensUpdateFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		authTokensReset(state) {
			state.loading = false;			
			state.tokens = undefined;
			state.error = undefined;
		},
	},
});

export const {
	authTokensUpdateRequest,
	authTokensUpdateSuccess,
	authTokensUpdateFail,
	authTokensReset,
} = authTokensUpdateSlice.actions;

export const authTokensUpdateReducer = authTokensUpdateSlice.reducer;
