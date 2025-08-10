// userInterfaces.ts
import { 
    KEY_LIST_REQUEST, 
    KEY_LIST_SUCCESS, 
    KEY_LIST_FAIL,
    KEY_CREATE_REQUEST, 
    KEY_CREATE_SUCCESS, 
    KEY_CREATE_FAIL,

} from "../constants/keyConstants";

export interface KeyListState {
    loading?: boolean;
    keys?: any;
    error?: string;
    page?: number;
    pages?: number;
}



interface KeyListRequestAction {
    type: typeof KEY_LIST_REQUEST;
}

interface KeyListSuccessAction {
    type: typeof KEY_LIST_SUCCESS;
    payload: any;
}

interface KeyListFailAction {
    type: typeof KEY_LIST_FAIL;
    payload: string;
}


export type KeyListActionTypes =
    | KeyListRequestAction
    | KeyListSuccessAction
    | KeyListFailAction


export interface KeyCreateState{
    loading?: boolean;
    response?: any;
    error?: string;    
}

interface KeyCreateRequestAction {
    type: typeof KEY_CREATE_REQUEST;
}

interface KeyCreateSuccessAction {
    type: typeof KEY_CREATE_SUCCESS;
    payload: any;
}

interface KeyCreateFailAction {
    type: typeof KEY_CREATE_FAIL;
    payload: string;
}


export type KeyCreateActionTypes =
    | KeyCreateRequestAction
    | KeyCreateSuccessAction
    | KeyCreateFailAction

