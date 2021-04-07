import decode from 'jwt-decode';
import {store} from '../store/store.js';
import {LOGOUT} from '../store/actionTypes';
import {history} from '../helpers/history';

export function checkLoginStatus(){
    return !!localStorage.getItem('token');
}

export const saveToken = (token)=>{
    return localStorage.setItem('token', JSON.stringify(token));
}

export function logout(){
    localStorage.removeItem('token');
    store.dispatch({type: LOGOUT});
    history.push("/login");
}

export function requestWithoutToken(url, method="GET", body){  
    const parameters = {
        method: method,
        headers: {
            "Content-Type": 'application/json'
        },
    }
    if(body){
        parameters.body = JSON.stringify(body)
    }   
    
    return fetch(url, parameters)
    .then(async(response) => {
        const res = await response.json();
        if(response.status >= 400 && response.status <= 599){
            if(res.error){
                throw res.error;
            }
            else {
                throw new Error('Something went wrong!!!');
            }
        }
        return res
    });
}


export const getToken = ()=>{
    const token = localStorage.getItem('token');
    if(token){
        const parsed = JSON.parse(token);
        const decoded = decode(parsed.jwt);
        if(decoded.exp - new Date().getTime() / 1000 > 60){
            return Promise.resolve(parsed.jwt);
        }else{       
            const apiHost = process.env.REACT_APP_API_HOST;

            return requestWithoutToken(`${apiHost}/user/${decoded.userId}/token`,'PUT', {
                    refreshToken: parsed.refreshToken
            })
            .then((token)=>{
                saveToken(token);
                return token.jwt;
            })
            .catch(()=>{
                logout();
            })
        }
    }else{
        logout();
    }
}