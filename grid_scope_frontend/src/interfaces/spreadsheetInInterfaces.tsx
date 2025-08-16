export interface SpreadsheetInListState {
    loading?: boolean;
    spreadsheetsIn?: any;
    error?: string;
    page?: number;
    pages?: number;
}

export interface SpreadsheetInCreateState{
    loading?: boolean;
    response?: any;
    status?:any;
    error?: string;    
}

export interface SpreadsheetInDeleteState{
    loading?: boolean;
    response?: any;
    error?: string;    
}

export interface SpreadsheetInEditState{
    loading?: boolean;
    response?: any;
    error?: string;    
}

export interface SpreadsheetInState{
    loading?: boolean;
    spreadsheetIn?: any;
    error?: string;    
}