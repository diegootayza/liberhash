import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { UserModel } from '../../modules/auth/models/UserModel'
import { RootState } from '../../../setup/redux/RootReducer'
import { _get } from '../../api/index'

type referral = {
    id: number
    firstName: string
    lastName: string
    createdAt: any
}

const ReferralAccountPage: React.FC = () => {
    const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
    const [isLoading, setIsLoading] = useState(true)
    const [referrals, setReferrals] = useState([])

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            let referrals: any = await _get('/users/referrals')
            setReferrals(referrals.data)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    return (
        <>
            <div>
                <h1>Your Referral ID</h1>
                <div className="card card-custom card-border stretch-50">
                    <div className="card-header">
                        <h3 className="card-title">
                            <strong>Send this Referral link to anyone you want to add to your referrals</strong>
                        </h3>
                    </div>
                    <div className="card-body">
                        <strong>https://smartrix.cl/smart-trade/?referral={user.username}</strong>
                    </div>
                </div>
            </div>
            <div className="pt-lg-8">
                <div>
                    <h1>Friends List</h1>
                    <p>All users that have used your code as referer.</p>
                </div>
                <div className="card">
                    <div className="card-body d-flex align-items-center py-8">
                        <table className="table table-row-dashed table-row-gray-300 gy-7">
                            <thead>
                                <tr className="fw-bolder fs-6 text-gray-800">
                                    <th>Friends Userd ID</th>
                                    <th>Friends Name</th>
                                    <th>Registration Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <th>
                                            <span className="spinner-border spinner-border-sm align-middle ms-12"></span>
                                        </th>
                                    </tr>
                                ) : (
                                    referrals.map((referral: referral) => (
                                        <tr key={referral.id}>
                                            <td>{referral.id}</td>
                                            <td>
                                                {referral.firstName} {referral.lastName}
                                            </td>
                                            <td>{referral.createdAt}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export { ReferralAccountPage }
