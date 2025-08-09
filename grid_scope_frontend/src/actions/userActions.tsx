import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../store'; // importujemy typ dispatch z store
import {
    userLoginRequest,
    userLoginSuccess,
    userLoginFail,
    userLogout,
} from '../reducers/userSlices'; 


export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userLoginRequest());

        const config = {
        headers: {
            'Content-type': 'application/json',
        },
        };

        const { data } = await axios.post(
        'http://127.0.0.1:8000/api/users/login/',
        { username, password },
        config
        );

        dispatch(userLoginSuccess(data));
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        userLoginFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('userInfo');
    dispatch(userLogout());

};