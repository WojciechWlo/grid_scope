// spreadsheetOutSlices.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
    SpreadsheetOutListState,
    SpreadsheetOutCreateState,
    SpreadsheetOutDeleteState,
    SpreadsheetOutState,
    SpreadsheetOutEditState,
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


const initialEditState: SpreadsheetOutEditState = {};

const spreadsheetOutEditSlice = createSlice({
    name: 'spreadsheetOutEdit',
    initialState:initialEditState,
    reducers: {
        spreadsheetOutEditRequest(state) {
            state.loading = true;
            state.error = undefined;
            state.response = undefined;
        },
        spreadsheetOutEditSuccess(state, action: PayloadAction<SpreadsheetOutEditState>) {
            state.loading = false;
            state.response = action.payload;
            state.error = undefined;
        },
        spreadsheetOutEditFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.response = undefined;
        },
        spreadsheetOutEditReset(state){
            state.loading =false;
            state.error = undefined;
            state.response = undefined;
        }
    },
});

export const {
    spreadsheetOutEditRequest,
    spreadsheetOutEditSuccess,
    spreadsheetOutEditFail,
    spreadsheetOutEditReset,
} = spreadsheetOutEditSlice.actions;

export const spreadsheetOutEditReducer = spreadsheetOutEditSlice.reducer;

const initialGetState: SpreadsheetOutState = {};

const spreadsheetOutGetSlice = createSlice({
    name: 'spreadsheetOut',
    initialState:initialGetState,
    reducers: {
        spreadsheetOutGetRequest(state) {
            state.loading = true;
            state.error = undefined;
            state.spreadsheetOut = undefined;
        },
        spreadsheetOutGetSuccess(state, action: PayloadAction<SpreadsheetOutState>) {
            state.loading = false;
            state.spreadsheetOut = action.payload;
            state.error = undefined;
        },
        spreadsheetOutGetFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.spreadsheetOut = undefined;
        },
        spreadsheetOutGetReset(state){
            state.loading =false;
            state.error = undefined;
            state.spreadsheetOut = undefined;
        }
    },
});

export const {
    spreadsheetOutGetRequest,
    spreadsheetOutGetSuccess,
    spreadsheetOutGetFail,
    spreadsheetOutGetReset,
} = spreadsheetOutGetSlice.actions;

export const spreadsheetOutGetReducer = spreadsheetOutGetSlice.reducer;