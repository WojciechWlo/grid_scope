// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
	SpreadsheetListState,
	SpreadsheetCreateState,
	SpreadsheetDeleteState,
	SpreadsheetEditState,
	SpreadsheetState,
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
		},
		spreadsheetListReset(state){
			state.loading = false;
			state.spreadsheets = undefined;
			state.page = undefined;
			state.pages = undefined;			
		}
	},
});

export const {
	spreadsheetListRequest,
	spreadsheetListSuccess,
	spreadsheetListFail,
	spreadsheetListReset,
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
		},
		spreadsheetCreateReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;		
		}
	},
});

export const {
	spreadsheetCreateRequest,
	spreadsheetCreateSuccess,
	spreadsheetCreateFail,
	spreadsheetCreateReset,
} = spreadsheetCreateSlice.actions;

export const spreadsheetCreateReducer = spreadsheetCreateSlice.reducer;


const initialDeleteState: SpreadsheetDeleteState = {};

export const spreadsheetDeleteSlice =createSlice({
	name: 'spreadsheetDelete',
	initialState:initialDeleteState,
	reducers: {
		spreadsheetDeleteRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.response = undefined;
		},
		spreadsheetDeleteSuccess(state, action: PayloadAction<SpreadsheetDeleteState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		spreadsheetDeleteFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		spreadsheetDeleteReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;
		}
	},
})

export const {
	spreadsheetDeleteRequest,
	spreadsheetDeleteSuccess,
	spreadsheetDeleteFail,
	spreadsheetDeleteReset,
} = spreadsheetDeleteSlice.actions;

export const spreadsheetDeleteReducer = spreadsheetDeleteSlice.reducer;


const initialEditState: SpreadsheetEditState = {};

const spreadsheetEditSlice = createSlice({
	name: 'spreadsheetEdit',
	initialState:initialEditState,
	reducers: {
		spreadsheetEditRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.response = undefined;
		},
		spreadsheetEditSuccess(state, action: PayloadAction<SpreadsheetEditState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		spreadsheetEditFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		spreadsheetEditReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;
		}
	},
});

export const {
	spreadsheetEditRequest,
	spreadsheetEditSuccess,
	spreadsheetEditFail,
	spreadsheetEditReset,
} = spreadsheetEditSlice.actions;

export const spreadsheetEditReducer = spreadsheetEditSlice.reducer;

const initialGetState: SpreadsheetState = {};

const spreadsheetGetSlice = createSlice({
	name: 'spreadsheet',
	initialState:initialGetState,
	reducers: {
		spreadsheetGetRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.spreadsheet = undefined;
		},
		spreadsheetGetSuccess(state, action: PayloadAction<SpreadsheetState>) {
			state.loading = false;
			state.spreadsheet = action.payload;
			state.error = undefined;
		},
		spreadsheetGetFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.spreadsheet = undefined;
		},
		spreadsheetGetReset(state){
			state.loading =false;
			state.error = undefined;
			state.spreadsheet = undefined;
		}
	},
});

export const {
	spreadsheetGetRequest,
	spreadsheetGetSuccess,
	spreadsheetGetFail,
	spreadsheetGetReset,
} = spreadsheetGetSlice.actions;

export const spreadsheetGetReducer = spreadsheetGetSlice.reducer;