// spreadsheetOutSlices.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
    SpreadsheetOutListState,
    SpreadsheetOutCreateState,
    SpreadsheetOutDeleteState,
} from '../interfaces/spreadsheetOutInterfaces';

const initialListState: SpreadsheetOutListState = {};

const spreadsheetOutListSlice = createSlice({
    name: 'spreadsheetOutList',
    initialState: initialListState,
    reducers: {
        spreadsheetOutListRequest(state) {
            state.loading = true;
            state.error = undefined;
        },
        spreadsheetOutListSuccess(state, action: PayloadAction<SpreadsheetOutListState>) {
            state.loading = false;
            state.spreadsheetsOut = action.payload.spreadsheetsOut;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        },
        spreadsheetOutListFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        spreadsheetOutListReset(state) {
            state.loading = false;
            state.spreadsheetsOut = undefined;
            state.page = undefined;
            state.pages = undefined;            
        }
    },
});

export const {
    spreadsheetOutListRequest,
    spreadsheetOutListSuccess,
    spreadsheetOutListFail,
    spreadsheetOutListReset,
} = spreadsheetOutListSlice.actions;

export const spreadsheetOutListReducer = spreadsheetOutListSlice.reducer;

const initialCreateState: SpreadsheetOutCreateState = {};

const spreadsheetOutCreateSlice = createSlice({
    name: 'spreadsheetOutCreate',
    initialState: initialCreateState,
    reducers: {
        spreadsheetOutCreateRequest(state) {
            state.loading = true;
            state.error = undefined;
        },
        spreadsheetOutCreateSuccess(state, action: PayloadAction<SpreadsheetOutCreateState>) {
            state.loading = false;
            state.response = action.payload;
            state.error = undefined;
        },
        spreadsheetOutCreateFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.response = undefined;
        },
        spreadsheetOutCreateReset(state) {
            state.loading = false;
            state.error = undefined;
            state.response = undefined;        
        }
    },
});

export const {
    spreadsheetOutCreateRequest,
    spreadsheetOutCreateSuccess,
    spreadsheetOutCreateFail,
    spreadsheetOutCreateReset,
} = spreadsheetOutCreateSlice.actions;

export const spreadsheetOutCreateReducer = spreadsheetOutCreateSlice.reducer;

const initialDeleteState: SpreadsheetOutDeleteState = {};

export const spreadsheetOutDeleteSlice = createSlice({
    name: 'spreadsheetOutDelete',
    initialState: initialDeleteState,
    reducers: {
        spreadsheetOutDeleteRequest(state) {
            state.loading = true;
            state.error = undefined;
            state.response = undefined;
        },
        spreadsheetOutDeleteSuccess(state, action: PayloadAction<SpreadsheetOutDeleteState>) {
            state.loading = false;
            state.response = action.payload;
            state.error = undefined;
        },
        spreadsheetOutDeleteFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.response = undefined;
        },
        spreadsheetOutDeleteReset(state) {
            state.loading = false;
            state.error = undefined;
            state.response = undefined;
        }
    },
});

export const {
    spreadsheetOutDeleteRequest,
    spreadsheetOutDeleteSuccess,
    spreadsheetOutDeleteFail,
    spreadsheetOutDeleteReset,
} = spreadsheetOutDeleteSlice.actions;

export const spreadsheetOutDeleteReducer = spreadsheetOutDeleteSlice.reducer;
