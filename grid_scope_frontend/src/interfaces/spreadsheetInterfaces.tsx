// userInterfaces.ts
import { 
    SPREADSHEET_LIST_REQUEST, 
    SPREADSHEET_LIST_SUCCESS, 
    SPREADSHEET_LIST_FAIL,
    SPREADSHEET_CREATE_REQUEST, 
    SPREADSHEET_CREATE_SUCCESS, 
    SPREADSHEET_CREATE_FAIL,

} from "../constants/spreadsheetConstants";

export interface SpreadsheetListState {
    loading?: boolean;
    spreadsheets?: any;
    error?: string;
    page?: number;
    pages?: number;
}



interface SpreadsheetListRequestAction {
    type: typeof SPREADSHEET_LIST_REQUEST;
}

interface SpreadsheetListSuccessAction {
    type: typeof SPREADSHEET_LIST_SUCCESS;
    payload: any;
}

interface SpreadsheetListFailAction {
    type: typeof SPREADSHEET_LIST_FAIL;
    payload: string;
}


export type SpreadsheetListActionTypes =
    | SpreadsheetListRequestAction
    | SpreadsheetListSuccessAction
    | SpreadsheetListFailAction


export interface SpreadsheetCreateState{
    loading?: boolean;
    response?: any;
    error?: string;    
}

interface SpreadsheetCreateRequestAction {
    type: typeof SPREADSHEET_CREATE_REQUEST;
}

interface SpreadsheetCreateSuccessAction {
    type: typeof SPREADSHEET_CREATE_SUCCESS;
    payload: any;
}

interface SpreadsheetCreateFailAction {
    type: typeof SPREADSHEET_CREATE_FAIL;
    payload: string;
}


export type SpreadsheetCreateActionTypes =
    | SpreadsheetCreateRequestAction
    | SpreadsheetCreateSuccessAction
    | SpreadsheetCreateFailAction

