import React, { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { UserModel } from '../../modules/auth/models/UserModel'
import { RootState } from '../../../setup/redux/RootReducer'
import { _put } from '../../api/index'

const ProfilePage: React.FC = () => {
    const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel

    const [isLoading, setIsLoading] = useState(false)
    const [onlineUser, setOnlineUser] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
    })

    const handleInputChange = (event: any) => {
        setOnlineUser({
            ...onlineUser,
            [event.target.name]: event.target.value,
        })
    }

    const sendUser = async (event: any) => {
        event.preventDefault()
        setIsLoading(true)
        await _put('/users/current', { firstName: onlineUser.firstName, lastName: onlineUser.lastName })
        setIsLoading(false)
    }

    return (
        <>
            <div>
                <h1>Update Account</h1>
                <form onSubmit={sendUser}>
                    <div className="mb-10">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" value={onlineUser.firstName} onChange={handleInputChange} name="firstName" />
                    </div>
                    <div className="mb-10">
                        <label className="form-label">LastName</label>
                        <input type="text" className="form-control" value={onlineUser.lastName} onChange={handleInputChange} name="lastName" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Send
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm align-middle ms-12"></span>
                            </>
                        ) : (
                            ''
                        )}
                    </button>
                </form>
            </div>
        </>
    )
}

export { ProfilePage }
