import axios, { AxiosError } from "axios";
import URL_BASE from "./xhr";
import { RegisterInputs } from "../pages/RegisterPage";
import { LoginForm } from "../pages/LoginPage";
import { ErrorInfo } from "react";

async function register(data : RegisterInputs)
{
    const result_req = await axios.post(`${URL_BASE}/user/register`, data, {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }); 
    return result_req.data;   
}

async function login(data : LoginForm){    
    try {
        const result_req = await axios.post(`${URL_BASE}/user/login`, data, {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        });
        return {
            data: result_req.data,
        };
    } catch (error : any) {        
        return { 
            error: error.response.data.error, 
        };
    }
}

async function consultUserAccount(id : string)
{
    try {
        const userInfo = await axios.get(`${URL_BASE}/user/${id}`);
        return userInfo.data;
    } catch (error : any) {        
    }
}



export default { register, login, consultUserAccount };