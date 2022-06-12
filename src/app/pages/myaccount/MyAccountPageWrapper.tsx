import React, { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { MyAccountPage } from './MyAccountPage'

const MyAccountPageWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>My Accounts</PageTitle>
            <MyAccountPage />
        </>
    )
}

export default MyAccountPageWrapper
