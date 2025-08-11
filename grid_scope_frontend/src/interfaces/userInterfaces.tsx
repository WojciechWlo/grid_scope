import {
	USER_LOGIN_REQUEST, 
	USER_LOGIN_SUCCESS, 
	USER_LOGIN_FAIL, 
	USER_LOGOUT,
	AUTH_TOKENS_UPDATE_REQUEST,
	AUTH_TOKENS_UPDATE_SUCCESS,
	AUTH_TOKENS_UPDATE_FAIL,
	AUTH_TOKENS_CLEAR,
} from "../constants/userConstants";

export interface UserLoginState {
    loading?: boolean;
    userInfo?: any;
    error?: string;
}



interface UserLoginRequestAction {
	type: typeof USER_LOGIN_REQUEST;
}

interface UserLoginSuccessAction {
	type: typeof USER_LOGIN_SUCCESS;
	payload: any;
}

interface UserLoginFailAction {
	type: typeof USER_LOGIN_FAIL;
	payload: string;
	}

interface UserLogoutAction {
	type: typeof USER_LOGOUT;
}

export type UserLoginActionTypes =
	| UserLoginRequestAction
	| UserLoginSuccessAction
	| UserLoginFailAction
	| UserLogoutAction;



export interface AuthTokensState {
    loading?: boolean;
    tokens?: any;
    error?: string;
}


interface AuthTokensUpdateRequestAction {
	type: typeof AUTH_TOKENS_UPDATE_REQUEST;
}

interface AuthTokensUpdateSuccessAction {
	type: typeof AUTH_TOKENS_UPDATE_SUCCESS;
	payload: any;
}

interface AuthTokensUpdateFailAction {
	type: typeof AUTH_TOKENS_UPDATE_FAIL;
	payload: string;
	}

interface AuthTokensClearAction {
	type: typeof AUTH_TOKENS_CLEAR;
}

export type AuthTokensUpdateActionTypes =
	| AuthTokensUpdateRequestAction
	| AuthTokensUpdateSuccessAction
	| AuthTokensUpdateFailAction
	| AuthTokensClearAction