import axios, { AxiosError } from 'axios';
import { RootState,AppDispatch } from '../store';
import {
    keyListRequest,
    keyListSuccess,
    keyListFail,
    keyCreateRequest,
    keyCreateSuccess,
    keyCreateFail,
    keyDeleteRequest,
    keyDeleteSuccess,
    keyDeleteFail,
    keyEditRequest,
    keyEditSuccess,
    keyEditFail,
    keyGetRequest,
    keyGetSuccess,
    keyGetFail,
} from '../reducers/keyReducers'; 


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
            `http://127.0.0.1:8000/api/keys/${keyword}`,
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

type KeyType={
    label:string, 
    key:string
}

export const createKey = (keyCreate: KeyType) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
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
            `http://127.0.0.1:8000/api/keys/create/`,
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

export const deleteKey = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try{
        dispatch(keyDeleteRequest())

        const {
            authTokens,
        } = getState()

        const config ={
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            }
        }

        const{data} = await axios.delete(
            `http://127.0.0.1:8000/api/keys/delete/${id}/`,
            config
        )

        dispatch(keyDeleteSuccess(data))


    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            keyDeleteFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
}

export const getKey = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(keyGetRequest());

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
            `http://127.0.0.1:8000/api/keys/${id}/`,
            config
        );

        dispatch(keyGetSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            keyGetFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

export const editKey = (keyEdit: KeyType, id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(keyEditRequest());

        const {
            authTokens,
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };

        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/keys/edit/${id}/`,
            keyEdit,
            config
        );

        dispatch(keyEditSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            keyEditFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};