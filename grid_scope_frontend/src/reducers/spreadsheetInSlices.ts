// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
	SpreadsheetInListState,
	SpreadsheetInCreateState,
	SpreadsheetInDeleteState,
	SpreadsheetInState,
	SpreadsheetInEditState,
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


const initialEditState: SpreadsheetInEditState = {};

const spreadsheetInEditSlice = createSlice({
	name: 'spreadsheetInEdit',
	initialState:initialEditState,
	reducers: {
		spreadsheetInEditRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.response = undefined;
		},
		spreadsheetInEditSuccess(state, action: PayloadAction<SpreadsheetInEditState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		spreadsheetInEditFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		spreadsheetInEditReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;
		}
	},
});

export const {
	spreadsheetInEditRequest,
	spreadsheetInEditSuccess,
	spreadsheetInEditFail,
	spreadsheetInEditReset,
} = spreadsheetInEditSlice.actions;

export const spreadsheetInEditReducer = spreadsheetInEditSlice.reducer;

const initialGetState: SpreadsheetInState = {};

const spreadsheetInGetSlice = createSlice({
	name: 'spreadsheetIn',
	initialState:initialGetState,
	reducers: {
		spreadsheetInGetRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.spreadsheetIn = undefined;
		},
		spreadsheetInGetSuccess(state, action: PayloadAction<SpreadsheetInState>) {
			state.loading = false;
			state.spreadsheetIn = action.payload;
			state.error = undefined;
		},
		spreadsheetInGetFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.spreadsheetIn = undefined;
		},
		spreadsheetInGetReset(state){
			state.loading =false;
			state.error = undefined;
			state.spreadsheetIn = undefined;
		}
	},
});

export const {
	spreadsheetInGetRequest,
	spreadsheetInGetSuccess,
	spreadsheetInGetFail,
	spreadsheetInGetReset,
} = spreadsheetInGetSlice.actions;

export const spreadsheetInGetReducer = spreadsheetInGetSlice.reducer;