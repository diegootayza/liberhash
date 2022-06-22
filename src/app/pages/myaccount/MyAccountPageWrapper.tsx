import { PageTitle } from '../../../_metronic/layout/core'
import { MyAccountPage } from './MyAccountPage'

const MyAccountPageWrapper = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>My Accounts</PageTitle>
            <MyAccountPage />
        </>
    )
}

export default MyAccountPageWrapper
