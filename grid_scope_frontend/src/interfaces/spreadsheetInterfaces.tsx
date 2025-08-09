// userInterfaces.ts
import { SPREADSHEET_LIST_REQUEST, SPREADSHEET_LIST_SUCCESS, SPREADSHEET_LIST_FAIL} from "../constants/spreadsheetConstants";

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

