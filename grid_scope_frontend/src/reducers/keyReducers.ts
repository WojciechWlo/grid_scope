// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
	KeyListState,
	KeyCreateState,
	KeyDeleteState,
	KeyEditState,
	KeyState,
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

const initialEditState: KeyEditState = {};

const keyEditSlice = createSlice({
	name: 'keyEdit',
	initialState:initialEditState,
	reducers: {
		keyEditRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.response = undefined;
		},
		keyEditSuccess(state, action: PayloadAction<KeyEditState>) {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		},
		keyEditFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.response = undefined;
		},
		keyEditReset(state){
			state.loading =false;
			state.error = undefined;
			state.response = undefined;
		}
	},
});

export const {
	keyEditRequest,
	keyEditSuccess,
	keyEditFail,
	keyEditReset,
} = keyEditSlice.actions;

export const keyEditReducer = keyEditSlice.reducer;

const initialGetState: KeyState = {};

const keyGetSlice = createSlice({
	name: 'key',
	initialState:initialGetState,
	reducers: {
		keyGetRequest(state) {
			state.loading = true;
			state.error = undefined;
			state.key = undefined;
		},
		keyGetSuccess(state, action: PayloadAction<KeyState>) {
			state.loading = false;
			state.key = action.payload;
			state.error = undefined;
		},
		keyGetFail(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.key = undefined;
		},
		keyGetReset(state){
			state.loading =false;
			state.error = undefined;
			state.key = undefined;
		}
	},
});

export const {
	keyGetRequest,
	keyGetSuccess,
	keyGetFail,
	keyGetReset,
} = keyGetSlice.actions;

export const keyGetReducer = keyGetSlice.reducer;