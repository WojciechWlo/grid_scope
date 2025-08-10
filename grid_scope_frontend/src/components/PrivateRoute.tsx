import React, { ReactNode }  from 'react'
import {Navigate} from 'react-router-dom'
import type { RootState} from '../store'
import {useSelector} from 'react-redux'

function PrivateRoute({children}:{children: ReactNode}) {
	
	const redirect = "/login"

    const userLogin = useSelector((state: RootState)=>state.userLogin)
    const {userInfo} = userLogin

	if (!userInfo) {
		return <Navigate to={redirect} replace />
	}

	return <>{children}</>
	}

export default PrivateRoute