import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	userLoginReducer,
	authTokensUpdateReducer,
} from './reducers/userSlices' ;
import { AuthTokensState } from './interfaces/userInterfaces';
import { 
	keyListReducer,
	keyCreateReducer,

} from './reducers/keySlices';
import {
    spreadsheetListReducer,
	spreadsheetCreateReducer
}  from './reducers/spreadsheetSlices';

function loadAuthTokens(): any | null {
	const item = localStorage.getItem('authTokens');
	if (!item) return null;
	try {
		return JSON.parse(item) as any;
	} catch {
		return null;
	}
	}

const authTokensFromStorage = loadAuthTokens();

const rootReducer = combineReducers({
	userLogin: userLoginReducer,
	authTokens:authTokensUpdateReducer,
	spreadsheetList : spreadsheetListReducer,
	spreadsheetCreate : spreadsheetCreateReducer,
	keyList : keyListReducer,
	keyCreate : keyCreateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: Partial<RootState> = {
	authTokens: {
		tokens: authTokensFromStorage,
	} as AuthTokensState,
};

const store = configureStore({
	reducer: rootReducer,
	preloadedState,
});

export type AppDispatch = typeof store.dispatch;

export default store;