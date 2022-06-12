import React, { useState } from 'react'
import { _put } from '../../api/index'

const SecurityPage: React.FC = () => {
    const [password, setPassword] = useState({
        password: '',
    })

    const handleInputChange = (event: any) => {
        setPassword({
            ...password,
            [event.target.name]: event.target.value,
        })
    }

    const sendPassword = async (event: any) => {
        event.preventDefault()
        await _put('/users/current', { password: password.password })
    }

    return (
        <>
            <div>
                <h1>Your Password</h1>
                <form onSubmit={sendPassword}>
                    <div className="mb-10">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" placeholder="New Password" onChange={handleInputChange} name="password" />
                    </div>
                    <div className="mb-10">
                        <label className="form-label">Confirm New Password</label>
                        <input type="password" className="form-control" placeholder="Confirm New Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </form>
            </div>
        </>
    )
}

export { SecurityPage }
