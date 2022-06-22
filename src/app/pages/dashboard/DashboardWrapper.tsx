import React, { useEffect, FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { ChartsWidget3, ChartsWidgetPie, MixedWidget2 } from '../../../_metronic/partials/widgets'
import { _get } from '../../api/index'
import { shallowEqual, useSelector } from 'react-redux'
import { UserModel } from '../../modules/auth/models/UserModel'
import { RootState } from '../../../setup/redux/RootReducer'

type account = {
    id: number
    firstName: string
    lastName: string
    strategy: any
    createdAt: any
    type: string
    cryp_id: number
}

type order = {
    id: number
    binance_account: any
    symbol: string
    transact_time: string
    transact_time_humans: string
    average_price: number
    executed_qty: string
    cumulative_quote_qty: string
    pnl: string
    trade_profit: string
    order_size_percentage: string
    trade_gross_profit: string
    related_order: order
}

const DashboardPage = () => {
    const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
    let cryp_id = 'account[]=' + user.cryp_id?.toString()
    const [statsData, setStatsData] = useState({})
    const [chartsData, setChartsData] = useState({ series: { data: [], extra: [] }, datasets: [] })
    const [pieData, setPieData] = useState({ series: { data: [], extra: [] }, datasets: [] })
    const [accounts, setAccounts] = useState([])
    const [openOrders, setOpenOrders] = useState([])
    const [closeOrders, setCloseOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingStats, setIsLoadingStats] = useState(true)
    if (user.type === 'admin') {
        if (!user.parent) {
            cryp_id = 'false'
        }
    }
    const [accountSelect, setAccountSelect] = useState()
    const [account, setAccount] = useState(cryp_id)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            setIsLoadingStats(true)
            let stats: any = await _get('/users/stats?' + account)
            setStatsData(stats.data)
            setIsLoadingStats(false)

            let charts: any = await _get('/users/charts?' + account)
            if (charts.data && charts.data.datasets.length > 0) setChartsData(charts.data)

            if (user.type === 'admin' && !user.parent) {
                let pie: any = await _get('/users/pie?' + account)
                if (pie.data && pie.data.datasets.length > 0) setPieData(pie.data)
            }

            let accounts: any = await _get('/users/accounts')
            setAccounts(accounts.data)
            let openOrders: any = await _get('/users/open-orders?page=1&' + account)
            setOpenOrders(openOrders?.data?.data?.items)
            let closeOrders: any = await _get('/users/close-orders?page=1&' + account)
            setCloseOrders(closeOrders.data.data)
            setIsLoading(false)
        }
        fetchData()
    }, [account])

    const change = function (event: any) {
        if (event.target.value !== '0') {
            setAccount('account[]=' + event.target.value)
            setAccountSelect(event.target.value)
        }
    }

    return (
        <>
            {user.type === 'admin' ? (
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <h1>Filter data by Binance Account</h1>
                        <select className="form-select" aria-label="Filter data by Binance Account" onChange={change} value={accountSelect}>
                            <option value="false">All</option>
                            {accounts.map((account: account) => (
                                <option key={account.id} value={account.cryp_id ? account.cryp_id : 0}>
                                    {account.firstName} {account.lastName} {account.cryp_id ? '' : '(no binance API)'}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : (
                ''
            )}
            <br />
            <br />
            <div className="row">
                <div className="col-md-12 mt-8 mb-8">
                    <MixedWidget2
                        className="card-l mb-l-8"
                        chartColor="danger"
                        chartHeight="200px"
                        strokeColor="#cb1e46"
                        statsData={statsData}
                        isLoading={isLoadingStats}
                        user={user}
                    />
                </div>
            </div>

            <div className="row">
                <div className={user.type !== 'admin' ? 'col-md-12 mt-8 mb-8' : 'col-md-6 mt-8 mb-8'}>
                    <ChartsWidget3 className="card-xxl-stretch mb-xl-3" chartsData={chartsData} isLoading={isLoading} />
                </div>
                {user.type === 'admin' && !user.parent ? (
                    <>
                        <div className="col-md-6 mt-8 mb-8">
                            <ChartsWidgetPie className="card-xxl-stretch mb-xl-3" chartsData={pieData} isLoading={isLoading} />
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>

            <div className="pt-lg-8">
                <div className="card">
                    <div className="card-header">
                        <h1 className="pt-lg-6">Open Orders</h1>
                    </div>

                    <div className="card-body d-flex align-items-center py-8">
                        <table className="table table-row-dashed table-row-gray-300 gy-7">
                            <thead>
                                <tr className="fw-bolder fs-6 text-gray-800">
                                    <th>Account</th>
                                    <th>Symbol</th>
                                    <th>Buy Time</th>
                                    <th>Buy Price</th>
                                    <th>Buy amount</th>
                                    <th>Capital operated</th>
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
                                    openOrders.map((order: order) => (
                                        <tr key={order.id}>
                                            <td>{order.binance_account.name}</td>
                                            <td>{order.symbol}</td>
                                            <td>{order.transact_time_humans}</td>
                                            <td>{order.average_price.toFixed(4)}</td>
                                            <td>{parseInt(order.executed_qty).toFixed(4)}</td>
                                            <td>${parseInt(order.cumulative_quote_qty).toFixed(4)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="pt-lg-8">
                <div className="card">
                    <div className="card-header">
                        <h1 className="pt-lg-6">Close Orders</h1>
                    </div>
                    <div className="card-body d-flex align-items-center py-8">
                        <table className="table table-row-dashed table-row-gray-300 gy-7">
                            <thead>
                                <tr className="fw-bolder fs-6 text-gray-800">
                                    <th>Account</th>
                                    <th>Symbol</th>
                                    <th>Buy Time</th>
                                    <th>Sell Time</th>
                                    <th>Buy amount</th>
                                    <th>Sell amount</th>
                                    <th>PNL</th>
                                    <th>Trade Profit</th>
                                    <th>% Traded Capital</th>
                                    <th>Gross Profit</th>
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
                                    closeOrders.map((order: order) => (
                                        <tr key={order.id}>
                                            <td>{order.binance_account.name}</td>
                                            <td>{order.symbol}</td>
                                            <td>{order.related_order.transact_time_humans}</td>
                                            <td>{order.related_order.transact_time_humans}</td>
                                            <td>${order.average_price.toFixed(4)}</td>
                                            <td>${order.related_order.average_price.toFixed(4)}</td>
                                            <td>${parseInt(order.pnl).toFixed(4)}</td>
                                            <td>{order.trade_profit}%</td>
                                            <td>{order.order_size_percentage}%</td>
                                            <td>{order.trade_gross_profit}%</td>
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

const DashboardWrapper: FC = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
            <DashboardPage />
        </>
    )
}

export default DashboardWrapper
