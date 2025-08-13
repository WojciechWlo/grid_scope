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
    error?: string;    
}
