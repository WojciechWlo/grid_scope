export interface ProcessListState {
    loading?: boolean;
    processes?: any;
    error?: string;
    page?: number;
    pages?: number;
}


export interface ProcessDeleteState{
    loading?: boolean;
    response?: any;
    error?: string;    
}

export interface ProcessCreateState{
    loading?: boolean;
    response?: any;
    status?:any;
    error?: string;    
}

export interface ProcessState{
    loading?: boolean;
    process?: any;
    error?: string;    
}

export interface ProcessEditState{
    loading?: boolean;
    response?: any;
    error?: string;    
}
