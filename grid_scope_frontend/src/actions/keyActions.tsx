import axios, { AxiosError } from 'axios';
import { RootState,AppDispatch } from '../store';
import {
    keyListRequest,
    keyListSuccess,
    keyListFail,
    keyCreateRequest,
    keyCreateSuccess,
    keyCreateFail,
} from '../reducers/keySlices'; 


export const listKeys = (keyword='') => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(keyListRequest());

        const {
            authTokens,
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };

        const { data } = await axios.get(
            `http://127.0.0.1:8000/api/spreadsheets/keys${keyword}`,
            config
        );

        dispatch(keyListSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        keyListFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};

type KeyCreateType={
    label:string, 
    key:string
}

export const createKey = (keyCreate: KeyCreateType) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(keyCreateRequest());

        const {
            authTokens,
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/spreadsheets/keys/create`,
            keyCreate,
            config
        );

        dispatch(keyCreateSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        keyCreateFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};
