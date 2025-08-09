import axios, { AxiosError } from 'axios';
import { RootState,AppDispatch } from '../store';
import {
    spreadsheetListRequest,
    spreadsheetListSuccess,
    spreadsheetListFail,
} from '../reducers/spreadsheetSlices'; 


export const listSpreadsheets = () => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    try {
        dispatch(spreadsheetListRequest());

        const {
            userLogin:{userInfo},
        } = getState()
        console.log(userInfo.tokens.access)
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.tokens.access}`
            },
        };

        const { data } = await axios.get(
            'http://127.0.0.1:8000/api/spreadsheets/',
            config
        );

        dispatch(spreadsheetListSuccess(data));

    } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        dispatch(
        spreadsheetListFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message
        )
        );
    }
};
