import React, { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { SecurityPage } from './SecurityPage'

const SecurityPageWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>Security</PageTitle>
            <SecurityPage />
        </>
    )
}

export default SecurityPageWrapper
