import React, { useState } from 'react'

const BinanceAccountPage: React.FC = () => {
    const [binanceAccount, setBinanceAccount] = useState({
        firstName: '',
        api: '',
        secret_key: '',
        strategy: '',
        notes: '',
    })

    const handleInputChange = (event: any) => {
        console.log(binanceAccount)
        setBinanceAccount({
            ...binanceAccount,
            [event.target.name]: event.target.value,
        })
    }

    const sendAccount = (event: any) => {
        event.preventDefault()
    }

    return (
        <>
            <div>
                <h1>Add Account</h1>
                <form onSubmit={sendAccount}>
                    <div className="mb-10">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Name" onChange={handleInputChange} name="firstName" />
                    </div>
                    <div className="mb-10">
                        <label className="form-label">API Key</label>
                        <input type="text" className="form-control" placeholder="API Key" onChange={handleInputChange} name="api" />
                    </div>
                    <div className="mb-10">
                        <label className="form-label">Secret Key</label>
                        <input type="text" className="form-control" placeholder="Secret Key" onChange={handleInputChange} name="secret_key" />
                    </div>
                    <div className="mb-10">
                        <label className="form-label">Strategy</label>
                        <input type="text" className="form-control" placeholder="Strategy" onChange={handleInputChange} name="strategy" />
                    </div>
                    <div className="mb-10">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" placeholder="Add some notes" onChange={handleInputChange} name="notes" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </form>
            </div>
        </>
    )
}

export { BinanceAccountPage }
