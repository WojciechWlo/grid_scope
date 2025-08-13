// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
	KeyListState,
	KeyCreateState,
	KeyDeleteState,
} from '../interfaces/keyInterfaces';

const initialListState: KeyListState = {};

const keyListSlice = createSlice({
	name: 'keyList',
	initialState: initialListState,
	reducers: {
		keyListRequest(state) {
			state.loading = true;
			state.error = undefined;
		},
		keyListSuccess(state, action: PayloadAction<KeyListState>) {
			state.loading = false;
			state.keys = action.payload.keys;
			state.page = action.payload.page;
			state.pages = action.payload.pages;
		},
		keyListFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		keyListReset(state)
		{
			state.loading = false
			state.error = undefined;
			state.keys = undefined;
			state.page = undefined;
			state.pages = undefined;

		}
	},
});

export const {
	keyListRequest,
	keyListSuccess,
	keyListFail,
	keyListReset
} = keyListSlice.actions;

export const keyListReducer = keyListSlice.reducer;

const initialCreateState: KeyCreateState = {};

const keyCreateSlice = createSlice({
	name: 'keyList',
	initialState:initialCreateState,
	reducers: {
		keyCreateRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.response = undefined;
		},
		keyCreateSuccess(state, action: PayloadAction<KeyCreateState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		keyCreateFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		keyCreateReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;
		}
	},
});

export const {
	keyCreateRequest,
	keyCreateSuccess,
	keyCreateFail,
	keyCreateReset,
} = keyCreateSlice.actions;

export const keyCreateReducer = keyCreateSlice.reducer;

const initialDeleteState: KeyDeleteState = {};

export const keyDeleteSlice =createSlice({
	name: 'keyDelete',
	initialState:initialDeleteState,
	reducers: {
		keyDeleteRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.response = undefined;
		},
		keyDeleteSuccess(state, action: PayloadAction<KeyDeleteState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		keyDeleteFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		keyDeleteReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;
		}
	},
})

export const {
	keyDeleteRequest,
	keyDeleteSuccess,
	keyDeleteFail,
	keyDeleteReset,
} = keyDeleteSlice.actions;

export const keyDeleteReducer = keyDeleteSlice.reducer;