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
