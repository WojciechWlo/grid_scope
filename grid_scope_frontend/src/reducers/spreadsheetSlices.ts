// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
	SpreadsheetListState,
	SpreadsheetCreateState,
} from '../interfaces/spreadsheetInterfaces';

const initialListState: SpreadsheetListState = {};

const spreadsheetListSlice = createSlice({
	name: 'spreadsheetList',
	initialState: initialListState,
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

export const spreadsheetListReducer = spreadsheetListSlice.reducer;

const initialCreateState: SpreadsheetCreateState = {};

const spreadsheetCreateSlice = createSlice({
	name: 'spreadsheetList',
	initialState:initialCreateState,
	reducers: {
		spreadsheetCreateRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.error = undefined;
		},
		spreadsheetCreateSuccess(state, action: PayloadAction<SpreadsheetCreateState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		spreadsheetCreateFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		}
	},
});

export const {
	spreadsheetCreateRequest,
	spreadsheetCreateSuccess,
	spreadsheetCreateFail
} = spreadsheetCreateSlice.actions;

export const spreadsheetCreateReducer = spreadsheetCreateSlice.reducer;