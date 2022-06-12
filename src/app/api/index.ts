import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export async function _post(url: string, data: any) {
    return await axios.post(API_URL + url, data)
}

export async function _put(url: string, data: any) {
    return await axios.put(API_URL + url, data)
}

export async function _get(url: string) {
    return await axios.get(API_URL + url)
}

export async function _delete(url: string) {
    return await axios.delete(API_URL + url)
}

export async function _patch(url: string, data: any) {
    return await axios.patch(API_URL + url, data)
}
export function prepareAccounts(ids: Array<number>) {
    let textids = []
    for (const id of ids) {
        textids.push('account[]=' + id)
    }
    console.log(textids.join('&'))
    return textids.join('&')
}
