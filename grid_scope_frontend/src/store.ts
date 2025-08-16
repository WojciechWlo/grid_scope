import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	userLoginReducer,
	authTokensUpdateReducer,
} from './reducers/userSlices' ;
import { AuthTokensState } from './interfaces/userInterfaces';
import { 
	keyListReducer,
	keyCreateReducer,
	keyDeleteReducer,
	keyEditReducer,
	keyGetReducer,

} from './reducers/keySlices';
import {
    spreadsheetListReducer,
	spreadsheetCreateReducer,
	spreadsheetDeleteReducer,
	spreadsheetEditReducer,
	spreadsheetGetReducer,
}  from './reducers/spreadsheetSlices';
import {
    spreadsheetInListReducer,
	spreadsheetInCreateReducer,
	spreadsheetInDeleteReducer,
	spreadsheetInEditReducer,
	spreadsheetInGetReducer,
}  from './reducers/spreadsheetInSlices';
import {
    spreadsheetOutListReducer,
    spreadsheetOutCreateReducer,
    spreadsheetOutDeleteReducer,
	spreadsheetOutEditReducer,
	spreadsheetOutGetReducer,
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
	spreadsheetEdit : spreadsheetEditReducer,
	spreadsheetGet : spreadsheetGetReducer,
	spreadsheetInList : spreadsheetInListReducer,
	spreadsheetInCreate : spreadsheetInCreateReducer,
	spreadsheetInDelete : spreadsheetInDeleteReducer,
	spreadsheetInEdit : spreadsheetInEditReducer,
	spreadsheetInGet : spreadsheetInGetReducer,
    spreadsheetOutList: spreadsheetOutListReducer,
    spreadsheetOutCreate: spreadsheetOutCreateReducer,
    spreadsheetOutDelete: spreadsheetOutDeleteReducer,
	spreadsheetOutEdit : spreadsheetOutEditReducer,
	spreadsheetOutGet : spreadsheetOutGetReducer,	
	keyList : keyListReducer,
	keyCreate : keyCreateReducer,
	keyDelete : keyDeleteReducer,
	keyEdit : keyEditReducer,
	keyGet : keyGetReducer,
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