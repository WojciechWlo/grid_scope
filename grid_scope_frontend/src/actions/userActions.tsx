import axios, { AxiosError } from 'axios';
import { RootState,AppDispatch } from '../store';
import {
    userLoginRequest,
    userLoginSuccess,
    userLoginFail,
    userLogout,
    authTokensUpdateRequest,
    authTokensUpdateSuccess,
    authTokensUpdateFail,
    authTokensReset,
} from '../reducers/userSlices'; 
import { keyListReset } from '../reducers/keySlices';


export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userLoginRequest());

        const config = {
        headers: {
            'Content-type': 'application/json',
        },
        };

        const { data } = await axios.post(
        'http://127.0.0.1:8000/api/users/login',
        { username, password },
        config
        );

        dispatch(userLoginSuccess(data.user));
        dispatch(authTokensUpdateSuccess(data.tokens))
        localStorage.setItem('authTokens', JSON.stringify(data.tokens));
    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        userLoginFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(userLogout());
    localStorage.removeItem('authTokens');    
    dispatch(authTokensReset());
    dispatch(keyListReset())
};

export const refreshTokens = () => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(authTokensUpdateRequest());

        const {
            authTokens,
        } = getState()
        
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/users/tokens/refresh`,
            {
                refresh:authTokens.tokens.refresh,
            },
            config
        );

        dispatch(authTokensUpdateSuccess(data.tokens))
        localStorage.setItem('authTokens', JSON.stringify(data.tokens));
        dispatch(userLoginSuccess(data.user));

    } catch (err) {
        dispatch(logout())
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        authTokensUpdateFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};