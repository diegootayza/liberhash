import React, { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { BinanceAccountPage } from './BinanceAccountPage'

const BinanceAccountPageWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>Binance</PageTitle>
            <BinanceAccountPage />
        </>
    )
}

export default BinanceAccountPageWrapper
