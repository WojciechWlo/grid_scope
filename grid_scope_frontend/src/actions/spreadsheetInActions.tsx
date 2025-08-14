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
            `http://127.0.0.1:8000/api/spreadsheets/in${keyword}`,
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

type SpreadsheetInCreateType={
    label:string, 
    spreadsheet_label:string,
    data_cell_range: string,
}

export const createSpreadsheetIn = (spreadsheetInCreate: SpreadsheetInCreateType) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
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
            `http://127.0.0.1:8000/api/spreadsheets/in/create`,
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
            `http://127.0.0.1:8000/api/spreadsheets/in/delete/${id}`,
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