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
} from '../reducers/spreadsheetOutSlices';


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
            `http://127.0.0.1:8000/api/spreadsheets/out${keyword}`,
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

type SpreadsheetOutCreateType = {
    label: string;
    spreadsheet_label: string;
    data_cell: string;
};

export const createSpreadsheetOut = (spreadsheetOutCreate: SpreadsheetOutCreateType) => async (dispatch: AppDispatch, getState: () => RootState) => {
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
            `http://127.0.0.1:8000/api/spreadsheets/out/create`,
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
            `http://127.0.0.1:8000/api/spreadsheets/out/delete/${id}`,
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