import React, { ReactNode }  from 'react'
import {Navigate} from 'react-router-dom'
import type { RootState} from '../store'
import {useSelector} from 'react-redux'

function PrivateRoute({children}:{children: ReactNode}) {
	
	const redirect = "/login"

	const authTokens = useSelector((state: RootState)=>state.authTokens)
	const {tokens} = authTokens

	if (!tokens) {
		return <Navigate to={redirect} replace />
	}

	return <>{children}</>
	}

export default PrivateRoute