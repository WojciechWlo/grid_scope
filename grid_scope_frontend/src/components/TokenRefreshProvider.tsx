import React, { useEffect, createContext, ReactNode, useContext } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import type { RootState,AppDispatch } from '../store'
import { 
    refreshTokens 
} from '../actions/userActions'

const TokenRefreshContext = createContext(undefined)

export function TokenRefreshProvider({ children }: { children: ReactNode }) {

    const dispatch = useDispatch<AppDispatch>()

	const authTokens = useSelector((state: RootState)=>state.authTokens)
	const {tokens} = authTokens


    useEffect(() => {
        dispatch(refreshTokens());
    }, [dispatch]);


    useEffect(() => {
        if (tokens && Object.keys(tokens).length > 0) {
            const interval = setInterval(() => {
                dispatch(refreshTokens());
            }, 4 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [tokens, dispatch]);

    return (
        <TokenRefreshContext.Provider value={undefined}>
            {children}
        </TokenRefreshContext.Provider>
    )
}

export const useTokenRefresh = () => useContext(TokenRefreshContext)
