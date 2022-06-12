import React, { useEffect, useState } from 'react'
import { ChartsWidget3 } from '../../../_metronic/partials/widgets'
import { _get } from '../../api/index'
import { shallowEqual, useSelector } from 'react-redux'
import { UserModel } from '../../modules/auth/models/UserModel'
import { RootState } from '../../../setup/redux/RootReducer'

type account = {
    firstName: string
    lastName: string
    id: number
    cryp_id: number
}

const WalletPage: React.FC = () => {
    const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
    const cryp_id = user.type === 'admin' && !user.parent ? 'false' : user.cryp_id

    const [account, setAccount] = useState(cryp_id)
    const [accounts, setAccounts] = useState([])
    const [balances, setBalances] = useState({ datasets: [], series_available: [], series_total: [] })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)

            let accounts: any = await _get('/users/accounts')
            setAccounts(accounts.data)

            let balances: any = await _get('/users/graph-balance?account=' + account)
            if (balances.data && balances.data.datasets.length > 0) setBalances(balances.data)

            setIsLoading(false)
        }
        fetchData()
    }, [account])

    const change = function (event: any) {
        setAccount(event.target.value ? event.target.value : false)
    }

    return (
        <>
            {isLoading ? (
                <span className="spinner-border spinner-border-sm align-middle ms-12"></span>
            ) : (
                <div>
                    {user.type === 'admin' ? (
                        <div>
                            <h1>Filter data by Binance Account</h1>
                            <select className="form-select" aria-label="Filter data by Binance Account" onChange={change} value={account}>
                                <option value="false">All</option>
                                {accounts.map((account: account) => (
                                    <option key={account.id} value={account.cryp_id}>
                                        {account.firstName} {account.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        ''
                    )}
                    <div>
                        <div className="row">
                            <div className="col-md-6 mt-10">
                                <div className="alert alert-success">
                                    <h1>Last Total Logged: ${parseFloat(balances!.series_total[balances!.series_total.length - 1]).toFixed(2)}</h1>
                                </div>
                            </div>
                            <div className="col-md-6 mt-10">
                                <div className="alert alert-primary">
                                    <h1>
                                        Last Available USDT Logged: ${parseFloat(balances!.series_available[balances!.series_available.length - 1]).toFixed(2)}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-8 mb-8">
                        <ChartsWidget3
                            className="card-xxl-stretch mb-xl-3"
                            chartsData={{ datasets: balances!.datasets, series: { data: balances!.series_total } }}
                            isLoading={false}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export { WalletPage }
