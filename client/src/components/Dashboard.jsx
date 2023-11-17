import React from 'react';
import {useAuth} from '../Contexts/AuthContext';

const Dashboard = () => {
    const {authUser,
        setAuthUser,
        isloggedIn,
        setIsLoggedIn
    } = useAuth()

        const LogIn=(e)=>{
            e.preventDefault()
            setIsLoggedIn(true)
            setAuthUser({
                name: 'John Doe', 
                role: 'owner'
            })  
            }
        const LogOut=(e)=>{
            e.preventDefault()
            setIsLoggedIn(false)
            setAuthUser(null)
            }
    return (
       <>
        <span>Loged in: {isloggedIn ? 'Logged-In' : 'Logged Out'}. </span>
        {isloggedIn ? (<span> Welcome {authUser.name} </span>) : (<span> Please Log In </span>)}
        <br/>
        {isloggedIn
        ? <button onClick={(e) => LogOut(e)}>Log Out</button>
    : <button onClick={(e) => LogIn(e)}>Log In</button>}
       </>
    )
}