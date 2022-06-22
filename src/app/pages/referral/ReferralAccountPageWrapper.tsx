import React, { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { ReferralAccountPage } from './ReferralAccountPage'
import { MasterLayout } from '../../../_metronic/layout/MasterLayout'

const ReferralAccountPageWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>Referrals</PageTitle>
            <ReferralAccountPage />
        </>
    )
}

export default ReferralAccountPageWrapper
