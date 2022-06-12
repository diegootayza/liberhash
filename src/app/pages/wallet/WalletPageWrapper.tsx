import React, { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { WalletPage } from './WalletPage'

const WalletPageWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>Wallet</PageTitle>
            <WalletPage />
        </>
    )
}

export default WalletPageWrapper
