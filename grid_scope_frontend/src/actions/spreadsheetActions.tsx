import axios, { AxiosError } from 'axios';
import { RootState,AppDispatch } from '../store';
import {
    spreadsheetListRequest,
    spreadsheetListSuccess,
    spreadsheetListFail,
    spreadsheetCreateRequest,
    spreadsheetCreateSuccess,
    spreadsheetCreateFail,
    spreadsheetDeleteRequest,
    spreadsheetDeleteSuccess,
    spreadsheetDeleteFail,
    spreadsheetGetRequest,
    spreadsheetGetSuccess,
    spreadsheetGetFail,
    spreadsheetEditRequest,
    spreadsheetEditSuccess,
    spreadsheetEditFail,
} from '../reducers/spreadsheetReducers'; 


export const listSpreadsheets = (keyword='') => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetListRequest());

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
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheets/${keyword}`,
            config
        );

        dispatch(spreadsheetListSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        spreadsheetListFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};

type SpreadsheetType={
    label:string, 
    url:string, 
    key_label:string,
}

export const createSpreadsheet = (spreadsheetCreate: SpreadsheetType) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetCreateRequest());

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
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheets/create/`,
            spreadsheetCreate,
            config
        );

        dispatch(spreadsheetCreateSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        spreadsheetCreateFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};

export const deleteSpreadsheet = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try{
        dispatch(spreadsheetDeleteRequest())

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
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheets/delete/${id}/`,
            config
        )

        dispatch(spreadsheetDeleteSuccess(data))


    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetDeleteFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
}

export const getSpreadsheet = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetGetRequest());

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
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheets/${id}/`,
            config
        );

        dispatch(spreadsheetGetSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetGetFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

export const editSpreadsheet = (spreadsheetEdit: SpreadsheetType, id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetEditRequest());

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
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheets/edit/${id}/`,
            spreadsheetEdit,
            config
        );

        dispatch(spreadsheetEditSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetEditFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};