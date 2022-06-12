import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../_metronic/helpers'
import { _post, _get, _put, _delete, _patch } from '../../api/index'

type account = {
    firstName: string
    lastName: string
    id: number
    strategy: any
    createdAt: any
    type: string
    referral: string
    cryp_id: number
    active: string
}

type balance = {
    available: string
    coin: string
    symbol: number
    usd: any
}

type balances = {
    balances: balance[]
    usdt_available: string
    usdt_total: string
}

const strategies = ['Divide & Conquer', 'Ride The Trend', 'Surfing The Risk', 'To The Moon']

const MyAccountPage: React.FC = () => {
    const [accounts, setAccounts] = useState([])
    const [algos, setAlgos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [loadingAccount, setLoadingAccount] = useState(false)
    const [error, setError] = useState(null)
    const [account, setAccount] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        strategy: 1,
        type: 'user',
        referral: '',
    })
    const [isLoadingBalance, setIsLoadingBalance] = useState(false)
    const [balances, setBalances] = useState({} as balances)
    const [balancesArray, setBalancesArray] = useState([])

    async function fetchData() {
        setIsLoading(true)
        let accounts: any = await _get('/users/accounts')
        setAccounts(accounts.data)
        let algos: any = await _get('/users/algos')
        setAlgos(algos.data.data.items)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function createAccount(event: any) {
        event.preventDefault()
        setError(null)
        setLoadingAccount(true)
        try {
            if (!update) {
                await _post('/users/register', account)
            } else {
                await _put('/users/current', account)
            }
        } catch (error: any) {
            console.log(error.response)
            setError(error.response.data.message)
            setLoadingAccount(false)
            return true
        }
        setLoadingAccount(false)
        window.location.reload()
    }

    const handleDelete = async (id: any) => {
        setLoadingAccount(true)
        await _delete('/users/' + id)
        setLoadingAccount(false)
        fetchData()
    }

    const handleInputChange = (event: any) => {
        event.persist()
        setError(null)
        setAccount({
            ...account,
            [event.target.name]: event.target.value,
        })
    }

    const handleEdit = (acc: any) => {
        console.log(acc)
        setUpdate(true)
        setAccount(acc)
    }
    const handleBalance = async (acc: any) => {
        console.log(acc)
        setIsLoadingBalance(true)
        let balances: any = await _get('/users/balance/' + acc.cryp_id)
        setBalances(balances.data)
        setBalancesArray(balances.data.balances)
        setIsLoadingBalance(false)
    }

    const handleActivate = async (acc: any) => {
        const activate = acc.active ? 0 : 1
        await _patch('/users/activate/' + acc.cryp_id + '?active=' + activate, acc)
        fetchData()
    }

    const cleanSave = (event: any) => {
        event.persist()
        setUpdate(false)
        setAccount({
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            strategy: 1,
            type: 'user',
            referral: '',
        })
    }

    return (
        <>
            <div className="card">
                {isLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm align-middle ms-12"></span>
                    </>
                ) : (
                    <div>
                        <div className="p-8">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_1" onClick={cleanSave}>
                                Add new account
                            </button>
                            <div className="modal fade" tabIndex={-1} id="kt_modal_1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">{update ? 'Update Account' : 'Add new account'}</h5>
                                            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                                <KTSVG path="/media/icons/duotune/arrows/arr061.svg" className="svg-icon svg-icon-2x" />
                                            </div>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={createAccount}>
                                                {error ? (
                                                    <>
                                                        <div className="bg-light-danger text-danger">{error}</div>
                                                    </>
                                                ) : (
                                                    ''
                                                )}

                                                <div className="mb-10">
                                                    <label className="form-label">First Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="firstName"
                                                        onChange={handleInputChange}
                                                        value={account.firstName}
                                                    />
                                                </div>
                                                <div className="mb-10">
                                                    <label className="form-label">Last Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="lastName"
                                                        onChange={handleInputChange}
                                                        value={account.lastName}
                                                    />
                                                </div>
                                                <div className="mb-10">
                                                    <label className="form-label">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="username"
                                                        onChange={handleInputChange}
                                                        value={account.username}
                                                    />
                                                </div>
                                                <div className="mb-10">
                                                    <label className="form-label">New Password</label>
                                                    <input type="password" className="form-control" name="password" onChange={handleInputChange} />
                                                </div>
                                                <div className="mb-10">
                                                    <label className="form-label">Referral</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="referral"
                                                        onChange={handleInputChange}
                                                        value={account.referral}
                                                    />
                                                </div>
                                                <div className="mb-10">
                                                    <label className="form-label">Algorithm</label>
                                                    <select
                                                        className="form-select"
                                                        aria-label="Select example"
                                                        name="strategy"
                                                        onChange={handleInputChange}
                                                        value={account.strategy}
                                                    >
                                                        {algos.map((algo: any) => (
                                                            <option key={algo.id} value={algo.id}>
                                                                {algo.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-10">
                                                    <label className="form-label">Account Type</label>
                                                    <select
                                                        className="form-select"
                                                        aria-label="Select example"
                                                        name="type"
                                                        onChange={handleInputChange}
                                                        value={account.type}
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </div>
                                                <button type="submit" className="btn btn-primary">
                                                    {update ? 'Update' : 'Create'}
                                                    {loadingAccount ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm align-middle ms-12"></span>
                                                        </>
                                                    ) : (
                                                        ''
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body d-flex align-items-center py-8">
                            <table className="table table-row-dashed table-row-gray-300 gy-7">
                                <thead>
                                    <tr className="fw-bolder fs-6 text-gray-800">
                                        <th>Account</th>
                                        <th>Strategy</th>
                                        <th>Type</th>
                                        <th>Balance</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((acc: account) => (
                                        <tr key={acc.id}>
                                            <td>
                                                <strong>
                                                    {acc.firstName} {acc.lastName}
                                                </strong>
                                                <br></br>
                                                <strong>Created at:</strong>
                                                <br></br>
                                                {acc.createdAt}
                                                <br></br>
                                            </td>
                                            <td>{strategies[acc.strategy - 1]}</td>
                                            <td>{acc.type}</td>
                                            <td>
                                                {acc.cryp_id ? (
                                                    <>
                                                        <a
                                                            className="btn btn-danger"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#balance"
                                                            onClick={() => handleBalance(acc)}
                                                        >
                                                            Get Balance
                                                        </a>
                                                    </>
                                                ) : (
                                                    ''
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-end flex-shrink-0">
                                                    <a
                                                        className="btn btn-icon btn-bg-light btn-sm me-1 btn-light-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#kt_modal_1"
                                                        onClick={() => handleEdit(acc)}
                                                    >
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </a>
                                                    <br></br>
                                                    <a className="btn btn-icon btn-bg-light btn-sm me-1 btn-light-danger" onClick={() => handleDelete(acc.id)}>
                                                        <i className="bi bi-trash-fill"></i>
                                                    </a>
                                                    <br></br>
                                                    <a
                                                        className={
                                                            acc.active ? 'btn btn-bg-light btn-sm me-1 btn-danger' : 'btn btn-bg-light btn-sm me-1 btn-primary'
                                                        }
                                                        onClick={() => handleActivate(acc)}
                                                    >
                                                        {acc.active ? 'deactivate' : 'activate'}
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal fade" tabIndex={-1} id="balance">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Balance</h5>
                                        <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                            <KTSVG path="/media/icons/duotune/arrows/arr061.svg" className="svg-icon svg-icon-2x" />
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        {isLoadingBalance ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm align-middle ms-12"></span>
                                            </>
                                        ) : (
                                            <>
                                                <table className="table table-row-dashed table-row-gray-300 gy-7">
                                                    <thead>
                                                        <tr className="fw-bolder fs-6 text-gray-800">
                                                            <th>Coin</th>
                                                            <th>Available</th>
                                                            <th>USD Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {balancesArray.map((balance: balance) => (
                                                            <tr key={balance.coin}>
                                                                <td>{balance.coin}</td>
                                                                <td>{balance.available}</td>
                                                                <td>{balance.usd}</td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td>
                                                                <b>USDT</b>
                                                            </td>
                                                            <td>
                                                                <b>{balances.usdt_available}</b>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Total</b>
                                                            </td>
                                                            <td>
                                                                <b>{balances.usdt_total}</b>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export { MyAccountPage }
