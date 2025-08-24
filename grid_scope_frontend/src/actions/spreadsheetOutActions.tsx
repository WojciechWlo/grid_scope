import axios, { AxiosError } from 'axios';
import { RootState, AppDispatch } from '../store';
import {
    spreadsheetOutListRequest,
    spreadsheetOutListSuccess,
    spreadsheetOutListFail,
    spreadsheetOutCreateRequest,
    spreadsheetOutCreateSuccess,
    spreadsheetOutCreateFail,
    spreadsheetOutDeleteRequest,
    spreadsheetOutDeleteSuccess,
    spreadsheetOutDeleteFail,
    spreadsheetOutGetRequest,
    spreadsheetOutGetSuccess,
    spreadsheetOutGetFail,
    spreadsheetOutEditRequest,
    spreadsheetOutEditSuccess,
    spreadsheetOutEditFail,
} from '../reducers/spreadsheetOutReducers';


export const listSpreadsheetsOut = (keyword = '') => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(spreadsheetOutListRequest());

        const { authTokens } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`,
            },
        };

        const { data } = await axios.get(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheetsout/${keyword}`,
            config
        );
        dispatch(spreadsheetOutListSuccess(data));
    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetOutListFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

type SpreadsheetOutType = {
    label: string;
    spreadsheet_label: string;
    data_cell: string;
    worksheet_name: string,
};

export const createSpreadsheetOut = (spreadsheetOutCreate: SpreadsheetOutType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(spreadsheetOutCreateRequest());

        const { authTokens } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`,
            },
        };

        const { data } = await axios.post(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheetsout/create/`,
            spreadsheetOutCreate,
            config
        );

        dispatch(spreadsheetOutCreateSuccess(data));
    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetOutCreateFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

export const deleteSpreadsheetOut = (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(spreadsheetOutDeleteRequest());

        const { authTokens } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`,
            },
        };

        const { data } = await axios.delete(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheetsout/delete/${id}/`,
            config
        );

        dispatch(spreadsheetOutDeleteSuccess(data));
    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetOutDeleteFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

export const getSpreadsheetOut = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetOutGetRequest());

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
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheetsout/${id}/`,
            config
        );

        dispatch(spreadsheetOutGetSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetOutGetFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

export const editSpreadsheetOut = (spreadsheetOutEdit: SpreadsheetOutType, id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetOutEditRequest());

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
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/spreadsheetsout/edit/${id}/`,
            spreadsheetOutEdit,
            config
        );

        dispatch(spreadsheetOutEditSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            spreadsheetOutEditFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};