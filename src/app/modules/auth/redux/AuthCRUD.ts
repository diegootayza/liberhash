import axios from 'axios'
import { UserModel } from '../models/UserModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/users/current`
export const LOGIN_URL = `${API_URL}/users/authenticate`
export const REGISTER_URL = `${API_URL}/users/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
    return axios.post(LOGIN_URL, {
        username: email,
        password,
    })
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string, password_confirmation: string) {
    return axios.post(REGISTER_URL, {
        email,
        first_name: firstname,
        last_name: lastname,
        password,
        password_confirmation,
    })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
    return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
        email,
    })
}

export function getUserByToken(token: string) {
    return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
        headers: {
            Authorization: 'bearer ' + token,
        },
    })
}
