import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userLoginSlice from './reducers/userSlices' ;
import { UserLoginState } from './interfaces/userInterfaces';
import { 
	keyListReducer,
	keyCreateReducer,

} from './reducers/keySlices';
import {
    spreadsheetListReducer,
	spreadsheetCreateReducer
}  from './reducers/spreadsheetSlices';

function loadUserInfo(): any | null {
	const item = localStorage.getItem('userInfo');
	if (!item) return null;
	try {
		return JSON.parse(item) as any;
	} catch {
		return null;
	}
	}

const userInfoFromStorage = loadUserInfo();

const rootReducer = combineReducers({
	userLogin: userLoginSlice,
	spreadsheetList : spreadsheetListReducer,
	spreadsheetCreate : spreadsheetCreateReducer,
	keyList : keyListReducer,
	keyCreate : keyCreateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: Partial<RootState> = {
	userLogin: {
		userInfo: userInfoFromStorage,
	} as UserLoginState,
};

const store = configureStore({
	reducer: rootReducer,
	preloadedState,
});

export type AppDispatch = typeof store.dispatch;

export default store;