export interface KeyListState {
    loading?: boolean;
    keys?: any;
    error?: string;
    page?: number;
    pages?: number;
}

export interface KeyCreateState{
    loading?: boolean;
    response?: any;
    error?: string;    
}

export interface KeyDeleteState{
    loading?: boolean;
    response?: any;
    error?: string;    
}
