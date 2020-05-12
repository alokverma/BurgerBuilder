import * as actionType from '../actions/actionTypes'
import axios from 'axios';

export const authStart = ()=>{
    return{
        type : actionType.AUTH_START
    }
}

export const authFails = (error)=>{
    return{
        type : actionType.AUTH_FAIL,
        error:error
    }
}

export const authSuccess = (localId,idToken)=>{
    return{
        type : actionType.AUTH_SUCCESS,
        userId:localId,
        token:idToken
    }
}

export const auth = (email,password,isSignUp)=>{

    return dispatch =>{
        dispatch(authStart());
        const auth = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBS3K-L_Ew0qigfRhFaxk5-RTEteNOhouk'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBS3K-L_Ew0qigfRhFaxk5-RTEteNOhouk'
        }
        axios.post(url,auth
         ).then((response)=>{
            const expirationDate  = new Date(new Date().getTime()+ response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.localId,response.data.idToken))
            dispatch(checkAuth(response.data.expiresIn))
        }).catch ((error)=>{
            dispatch(authFails(error.response.data.error))
        })

    }
}

export const checkAuth = (expirationTime) =>{
    return dispatch =>{
        setTimeout( ()=>{
            dispatch(logout())
        },expirationTime*1000)
    }
}

export const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionType.LOGOUT
    }
}

export const setAuthRedirectPath = (path)=>{
    return{
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const checkAuthStatus = ()=>{
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            const userId = localStorage.getItem('userId')
            if(expirationDate > new Date()){
                dispatch(authSuccess(userId,token))
                dispatch(checkAuth((expirationDate.getTime()- new Date().getTime())/1000))
            }else{
                dispatch(logout());
            }
        }
    }
}