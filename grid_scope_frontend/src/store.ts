import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	userLoginReducer,
	authTokensUpdateReducer,
} from './reducers/userReducers' ;
import { AuthTokensState } from './interfaces/userInterfaces';
import { 
	keyListReducer,
	keyCreateReducer,
	keyDeleteReducer,
	keyEditReducer,
	keyGetReducer,

} from './reducers/keyReducers';
import {
    spreadsheetListReducer,
	spreadsheetCreateReducer,
	spreadsheetDeleteReducer,
	spreadsheetEditReducer,
	spreadsheetGetReducer,
}  from './reducers/spreadsheetReducers';
import {
    spreadsheetInListReducer,
	spreadsheetInCreateReducer,
	spreadsheetInDeleteReducer,
	spreadsheetInEditReducer,
	spreadsheetInGetReducer,
}  from './reducers/spreadsheetInReducers';
import {
    spreadsheetOutListReducer,
    spreadsheetOutCreateReducer,
    spreadsheetOutDeleteReducer,
	spreadsheetOutEditReducer,
	spreadsheetOutGetReducer,
} from './reducers/spreadsheetOutReducers';
import{
	processListReducer,
	processDeleteReducer,
    processCreateReducer,
	processEditReducer,
	processGetReducer,
	processTestReducer,
	processRunReducer,
}from './reducers/processReducers';

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
	processList : processListReducer,
	processDelete : processDeleteReducer,
	processCreate : processCreateReducer,
	processEdit : processEditReducer,
	processGet : processGetReducer,	
	processTest : processTestReducer,
	processRun : processRunReducer,
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