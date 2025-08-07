import { 
	configureStore, combineReducers 
} from '@reduxjs/toolkit'; 
import {
	userLoginReducer
} from './reducers/userReducers';
import { UserLoginState } from './interfaces/userInterfaces';

const userInfoFromStorage:UserLoginState = {}

const preloadedState = {

}

const store = configureStore({
	reducer: combineReducers({
		userLogin:userLoginReducer,
	}),
	preloadedState,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;