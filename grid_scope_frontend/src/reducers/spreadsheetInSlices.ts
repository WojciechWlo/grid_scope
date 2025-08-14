// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
	SpreadsheetInListState,
	SpreadsheetInCreateState,
	SpreadsheetInDeleteState,
} from '../interfaces/spreadsheetInInterfaces';

const initialListState: SpreadsheetInListState = {};

const spreadsheetInListSlice = createSlice({
	name: 'spreadsheetInList',
	initialState: initialListState,
	reducers: {
		spreadsheetInListRequest(state) {
			state.loading = true;
			state.error = undefined;
		},
		spreadsheetInListSuccess(state, action: PayloadAction<SpreadsheetInListState>) {
			state.loading = false;
			state.spreadsheetsIn = action.payload.spreadsheetsIn;
			state.page = action.payload.page;
			state.pages = action.payload.pages;
		},
		spreadsheetInListFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		spreadsheetInListReset(state){
			state.loading = false;
			state.spreadsheetsIn = undefined;
			state.page = undefined;
			state.pages = undefined;			
		}
	},
});

export const {
	spreadsheetInListRequest,
	spreadsheetInListSuccess,
	spreadsheetInListFail,
	spreadsheetInListReset,
} = spreadsheetInListSlice.actions;

export const spreadsheetInListReducer = spreadsheetInListSlice.reducer;

const initialCreateState: SpreadsheetInCreateState = {};

const spreadsheetInCreateSlice = createSlice({
	name: 'spreadsheetInList',
	initialState:initialCreateState,
	reducers: {
		spreadsheetInCreateRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.error = undefined;
		},
		spreadsheetInCreateSuccess(state, action: PayloadAction<SpreadsheetInCreateState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		spreadsheetInCreateFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		spreadsheetInCreateReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;		
		}
	},
});

export const {
	spreadsheetInCreateRequest,
	spreadsheetInCreateSuccess,
	spreadsheetInCreateFail,
	spreadsheetInCreateReset,
} = spreadsheetInCreateSlice.actions;

export const spreadsheetInCreateReducer = spreadsheetInCreateSlice.reducer;


const initialDeleteState: SpreadsheetInDeleteState = {};

export const spreadsheetInDeleteSlice =createSlice({
	name: 'spreadsheetInDelete',
	initialState:initialDeleteState,
	reducers: {
		spreadsheetInDeleteRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.response = undefined;
		},
		spreadsheetInDeleteSuccess(state, action: PayloadAction<SpreadsheetInDeleteState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		spreadsheetInDeleteFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		spreadsheetInDeleteReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;
		}
	},
})

export const {
	spreadsheetInDeleteRequest,
	spreadsheetInDeleteSuccess,
	spreadsheetInDeleteFail,
	spreadsheetInDeleteReset,
} = spreadsheetInDeleteSlice.actions;

export const spreadsheetInDeleteReducer = spreadsheetInDeleteSlice.reducer;