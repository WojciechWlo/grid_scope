// userInterfaces.ts
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL , USER_LOGOUT} from "../constants/userConstants";

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
