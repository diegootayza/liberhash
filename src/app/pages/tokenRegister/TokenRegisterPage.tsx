import React, { useState } from 'react'
import { _post } from '../../api/index'
import * as auth from '../../modules/auth/redux/AuthRedux'
import { useDispatch } from 'react-redux'

const TokenRegisterPage: React.FC = (props) => {
    const dispatch = useDispatch()
    const [binanceAPI, setBinanceAPI] = useState({
        key: '',
        secret: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (event: any) => {
        setBinanceAPI({
            ...binanceAPI,
            [event.target.name]: event.target.value,
        })
    }

    async function sendBinanceApi(event: any) {
        event.preventDefault()
        setIsLoading(true)
        const user: any = await _post('/users/api', { key: binanceAPI.key, secret: binanceAPI.secret })
        setIsLoading(false)
        dispatch(auth.actions.fulfillUser(user.data))
    }

    return (
        <>
            <div>
                <h1>Token Registration</h1>
                <form onSubmit={sendBinanceApi}>
                    <div className="mb-10">
                        <label className="form-label">API KEY :</label>
                        <input type="text" className="form-control" name="key" onChange={handleInputChange} />
                    </div>
                    <div className="mb-10">
                        <label className="form-label">SECRET KEY :</label>
                        <input type="text" className="form-control" name="secret" onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add
                        {isLoading ? <span className="spinner-border spinner-border-sm align-middle ms-12"></span> : ''}
                    </button>
                </form>
            </div>
        </>
    )
}

export { TokenRegisterPage }
