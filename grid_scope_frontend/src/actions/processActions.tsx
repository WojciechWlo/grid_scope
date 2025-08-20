import axios, { AxiosError } from 'axios';
import { RootState,AppDispatch } from '../store';
import {
    processListRequest,
    processListSuccess,
    processListFail,
    processDeleteRequest,
    processDeleteSuccess,
    processDeleteFail,
    processEditRequest,
    processEditSuccess,
    processEditFail,
    processCreateRequest,
    processCreateSuccess,
    processCreateFail,
    processGetRequest,
    processGetSuccess,
    processGetFail,
    processTestRequest,
    processTestSuccess,
    processTestFail,
    processRunRequest,
    processRunSuccess,
    processRunFail,
} from '../reducers/processReducers'; 


export const listProcesses = (keyword='') => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(processListRequest());

        const {
            authTokens,
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };

        const { data } = await axios.get(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/processes/${keyword}`,
            config
        );

        dispatch(processListSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            processListFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};


export const deleteProcess = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try{
        dispatch(processDeleteRequest())

        const {
            authTokens,
        } = getState()

        const config ={
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            }
        }

        const{data} = await axios.delete(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/processes/delete/${id}/`,
            config
        )

        dispatch(processDeleteSuccess(data))


    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            processDeleteFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
}
type ProcessType={
    label:string,
    spreadsheet_in_labels:string[],
    spreadsheet_out_labels:string[], 
    query:string,
}

export const editProcess = (processEdit: ProcessType, id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(processEditRequest());

        const {
            authTokens,
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };

        const { data } = await axios.put(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/processes/edit/${id}/`,
            processEdit,
            config
        );

        dispatch(processEditSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            processEditFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

export const createProcess = (processCreate: ProcessType) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(processCreateRequest());

        const {
            authTokens,
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };

        const { data } = await axios.post(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/processes/create/`,
            processCreate,
            config
        );

        dispatch(processCreateSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        processCreateFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};

export const getProcess = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(processGetRequest());

        const {
            authTokens,
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };

        const { data } = await axios.get(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/processes/${id}/`,
            config
        );

        dispatch(processGetSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
            processGetFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message
            )
        );
    }
};

export const testProcess = (processTest: ProcessType) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(processTestRequest());

        const { authTokens } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };

        const { data } = await axios.post(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/processes/test/`,
            processTest,
            config
        );

        dispatch(processTestSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ errors?: string[]; details?: string }>;

        let messages: string[] = [];

        if (error.response?.data?.errors) {
            messages = error.response.data.errors;
        } else if (error.response?.data?.details) {
            messages = [error.response.data.details];
        } else {
            messages = [error.message];
        }

        dispatch(processTestFail(messages));
    }
};

export const runProcess = (id: string) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(processRunRequest());

        const { authTokens } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authTokens.tokens.access}`
            },
        };
        
        const { data } = await axios.get(
            process.env.REACT_APP_BACKEND_ADDRESS+`/api/processes/run/${id}/`,
            config
        );

        dispatch(processRunSuccess(data));
        
    } catch (err) {
        const error = err as AxiosError<{ errors?: string[]; details?: string }>;

        let messages: string[] = [];

        if (error.response?.data?.errors) {
            messages = error.response.data.errors;
        } else if (error.response?.data?.details) {
            messages = [error.response.data.details];
        } else {
            messages = [error.message];
        }

        dispatch(processRunFail(messages));
    }
};