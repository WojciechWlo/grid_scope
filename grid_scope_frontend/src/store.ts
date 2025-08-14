import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	userLoginReducer,
	authTokensUpdateReducer,
} from './reducers/userSlices' ;
import { AuthTokensState } from './interfaces/userInterfaces';
import { 
	keyListReducer,
	keyCreateReducer,
	keyDeleteReducer

} from './reducers/keySlices';
import {
    spreadsheetListReducer,
	spreadsheetCreateReducer,
	spreadsheetDeleteReducer,
}  from './reducers/spreadsheetSlices';
import {
    spreadsheetInListReducer,
	spreadsheetInCreateReducer,
	spreadsheetInDeleteReducer,
}  from './reducers/spreadsheetInSlices';
import {
    spreadsheetOutListReducer,
    spreadsheetOutCreateReducer,
    spreadsheetOutDeleteReducer,
} from './reducers/spreadsheetOutSlices';

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
	spreadsheetDelete : spreadsheetDeleteReducer,
	spreadsheetInList : spreadsheetInListReducer,
	spreadsheetInCreate : spreadsheetInCreateReducer,
	spreadsheetInDelete : spreadsheetInDeleteReducer,
    spreadsheetOutList: spreadsheetOutListReducer,
    spreadsheetOutCreate: spreadsheetOutCreateReducer,
    spreadsheetOutDelete: spreadsheetOutDeleteReducer,	
	keyList : keyListReducer,
	keyCreate : keyCreateReducer,
	keyDelete : keyDeleteReducer,
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