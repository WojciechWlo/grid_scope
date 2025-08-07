import axios, { AxiosError } from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT
} from '../constants/userConstants'
import { Dispatch } from '@reduxjs/toolkit'

export const login = (username:string, password:string)=>async(dispatch:Dispatch) =>{
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const config ={
            headers: {
                'Content-type':'application/json'
            }
        }
        const{data} = await axios.post('http://127.0.0.1:8000/api/users/login/',
            {
            'username':username,
            'password':password
            },
            config
        )

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(err){
        const error = err as AxiosError<{ detail: string }>
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}

export const logout = ()=>(dispatch:Dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
//    dispatch({type:USER_DETAILS_RESET})
//    dispatch({type:ORDER_LIST_MY_RESET})
//    dispatch({type:USER_LIST_RESET})
}