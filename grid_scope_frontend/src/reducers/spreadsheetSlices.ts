// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  SpreadsheetListState } from '../interfaces/spreadsheetInterfaces';

const initialState: SpreadsheetListState = {};

const spreadsheetListSlice = createSlice({
	name: 'spreadsheetList',
	initialState,
	reducers: {
		spreadsheetListRequest(state) {
			state.loading = true;
			state.error = undefined;
		},
		spreadsheetListSuccess(state, action: PayloadAction<SpreadsheetListState>) {
			state.loading = false;
			state.spreadsheets = action.payload.spreadsheets;
			state.page = action.payload.page;
			state.pages = action.payload.pages;
		},
		spreadsheetListFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		}
	},
});

export const {
	spreadsheetListRequest,
	spreadsheetListSuccess,
	spreadsheetListFail
} = spreadsheetListSlice.actions;

export default spreadsheetListSlice.reducer;