import React , {useEffect} from 'react'
import {  Route , useNavigate , Outlet} from "react-router-dom";
import {useAuth} from '../contexts/AuthContext.js';

const PrivateRoute = ({element: Component, ...rest}) => {
    const {currentUser} = useAuth();
    const navigate = useNavigate()
     useEffect(() => {
        if(!currentUser) {
            navigate('/login', {replace: true})
        }
    }, [])
  return (
        <>
            <Outlet />
        </>
    )
}

export default PrivateRoute