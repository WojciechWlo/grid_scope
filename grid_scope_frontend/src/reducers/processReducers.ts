// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
	ProcessListState,
	ProcessDeleteState,
    ProcessCreateState,
    ProcessState,
    ProcessEditState,
} from '../interfaces/processInterfaces';

const initialListState: ProcessListState = {};

const processListSlice = createSlice({
	name: 'processList',
	initialState: initialListState,
	reducers: {
		processListRequest(state) {
			state.loading = true;
			state.error = undefined;
		},
		processListSuccess(state, action: PayloadAction<ProcessListState>) {
			state.loading = false;
			state.processes = action.payload.processes;
			state.page = action.payload.page;
			state.pages = action.payload.pages;

		},
		processListFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		processListReset(state)
		{
			state.loading = false
			state.error = undefined;
			state.processes = undefined;
			state.page = undefined;
			state.pages = undefined;
		}
	},
});

export const {
	processListRequest,
	processListSuccess,
	processListFail,
	processListReset
} = processListSlice.actions;

export const processListReducer = processListSlice.reducer;

const initialDeleteState: ProcessDeleteState = {};

export const processDeleteSlice =createSlice({
	name: 'processDelete',
	initialState:initialDeleteState,
	reducers: {
		processDeleteRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.response = undefined;
		},
		processDeleteSuccess(state, action: PayloadAction<ProcessDeleteState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		processDeleteFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		processDeleteReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;
		}
	},
})

export const {
	processDeleteRequest,
	processDeleteSuccess,
	processDeleteFail,
	processDeleteReset,
} = processDeleteSlice.actions;

export const processDeleteReducer = processDeleteSlice.reducer;

const initialEditState: ProcessEditState = {};

const processEditSlice = createSlice({
    name: 'processEdit',
    initialState:initialEditState,
    reducers: {
        processEditRequest(state) {
            state.loading = true;
            state.error = undefined;
            state.response = undefined;
        },
        processEditSuccess(state, action: PayloadAction<ProcessEditState>) {
            state.loading = false;
            state.response = action.payload;
            state.error = undefined;
        },
        processEditFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.response = undefined;
        },
        processEditReset(state){
            state.loading =false;
            state.error = undefined;
            state.response = undefined;
        }
    },
});

export const {
    processEditRequest,
    processEditSuccess,
    processEditFail,
    processEditReset,
} = processEditSlice.actions;

export const processEditReducer = processEditSlice.reducer;

const initialGetState: ProcessState = {};

const processGetSlice = createSlice({
    name: 'process',
    initialState:initialGetState,
    reducers: {
        processGetRequest(state) {
            state.loading = true;
            state.error = undefined;
            state.process = undefined;
        },
        processGetSuccess(state, action: PayloadAction<ProcessState>) {
            state.loading = false;
            state.process = action.payload;
            state.error = undefined;
        },
        processGetFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.process = undefined;
        },
        processGetReset(state){
            state.loading =false;
            state.error = undefined;
            state.process = undefined;
        }
    },
});

export const {
    processGetRequest,
    processGetSuccess,
    processGetFail,
    processGetReset,
} = processGetSlice.actions;

export const processGetReducer = processGetSlice.reducer;

const initialCreateState: ProcessCreateState = {};

const processCreateSlice = createSlice({
    name: 'processList',
    initialState:initialCreateState,
    reducers: {
        processCreateRequest(state) {
            state.loading = true;
            state.error = undefined;
            state.error = undefined;
        },
        processCreateSuccess(state, action: PayloadAction<ProcessCreateState>) {
            state.loading = false;
            state.response = action.payload;
            state.error = undefined;
        },
        processCreateFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
            state.response = undefined;
        },
        processCreateReset(state){
            state.loading =false;
            state.error = undefined;
            state.response = undefined;		
        }
    },
});

export const {
    processCreateRequest,
    processCreateSuccess,
    processCreateFail,
    processCreateReset,
} = processCreateSlice.actions;

export const processCreateReducer = processCreateSlice.reducer;