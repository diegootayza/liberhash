import React, { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { ReferralAccountPage } from './ReferralAccountPage'

const ReferralAccountPageWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>Referrals</PageTitle>
            <ReferralAccountPage />
        </>
    )
}

export default ReferralAccountPageWrapper
