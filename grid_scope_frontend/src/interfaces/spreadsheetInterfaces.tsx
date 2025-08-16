export interface SpreadsheetListState {
    loading?: boolean;
    spreadsheets?: any;
    error?: string;
    page?: number;
    pages?: number;
}

export interface SpreadsheetCreateState{
    loading?: boolean;
    response?: any;
    status?:any;
    error?: string;    
}

export interface SpreadsheetDeleteState{
    loading?: boolean;
    response?: any;
    error?: string;    
}

export interface SpreadsheetEditState{
    loading?: boolean;
    response?: any;
    error?: string;    
}

export interface SpreadsheetState{
    loading?: boolean;
    spreadsheet?: any;
    error?: string;    
}