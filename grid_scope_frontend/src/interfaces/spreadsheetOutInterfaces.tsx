export interface SpreadsheetOutListState {
    loading?: boolean;
    spreadsheetsOut?: any;
    error?: string;
    page?: number;
    pages?: number;
}

export interface SpreadsheetOutCreateState {
    loading?: boolean;
    response?: any;
    status?: any;
    error?: string;    
}

export interface SpreadsheetOutDeleteState {
    loading?: boolean;
    response?: any;
    error?: string;    
}