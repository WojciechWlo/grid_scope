import axios, { AxiosError } from 'axios';
import { RootState,AppDispatch } from '../store';
import {
    spreadsheetInListRequest,
    spreadsheetInListSuccess,
    spreadsheetInListFail,
    spreadsheetInCreateRequest,
    spreadsheetInCreateSuccess,
    spreadsheetInCreateFail,
    spreadsheetInDeleteRequest,
    spreadsheetInDeleteSuccess,
    spreadsheetInDeleteFail,
    spreadsheetInEditRequest,
    spreadsheetInEditSuccess,
    spreadsheetInEditFail,
    spreadsheetInGetFail,
    spreadsheetInGetSuccess,
    spreadsheetInGetRequest,
} from '../reducers/spreadsheetInSlices';


export const listSpreadsheetsIn = (keyword='') => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetInListRequest());

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
            `http://127.0.0.1:8000/api/spreadsheetsin${keyword}/`,
            config
        );
        dispatch(spreadsheetInListSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        spreadsheetInListFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};

type SpreadsheetInType={
    label:string, 
    spreadsheet_label:string,
    data_cell_range: string,
}

export const createSpreadsheetIn = (spreadsheetInCreate: SpreadsheetInType) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetInCreateRequest());

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
            `http://127.0.0.1:8000/api/spreadsheetsin/create/`,
            spreadsheetInCreate,
            config
        );

        dispatch(spreadsheetInCreateSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        spreadsheetInCreateFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};

export const deleteSpreadsheetIn = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try{
        dispatch(spreadsheetInDeleteRequest())

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
            `http://127.0.0.1:8000/api/spreadsheetsin/delete/${id}/`,
            config
        )

        dispatch(spreadsheetInDeleteSuccess(data))


    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetInDeleteFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
}

export const getSpreadsheetIn = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetInGetRequest());

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
            `http://127.0.0.1:8000/api/spreadsheetsin/${id}/`,
            config
        );

        dispatch(spreadsheetInGetSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetInGetFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

export const editSpreadsheetIn = (spreadsheetInEdit: SpreadsheetInType, id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetInEditRequest());

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
            `http://127.0.0.1:8000/api/spreadsheetsin/edit/${id}/`,
            spreadsheetInEdit,
            config
        );

        dispatch(spreadsheetInEditSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetInEditFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};