import { useIntl } from 'react-intl'
import { AsideMenuItem } from './AsideMenuItem'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../setup'

export function AsideMenuMain() {
    const intl = useIntl()
    const userType = useSelector<RootState>(({ auth }) => auth?.user?.type, shallowEqual)

    return (
        <>
            <AsideMenuItem
                to="/dashboard"
                icon="/media/icons/duotune/art/art002.svg"
                title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
                fontIcon="bi-app-indicator"
            />
            {userType === 'admin' ? (
                <>
                    <AsideMenuItem to="/myaccount" icon="/media/icons/duotune/general/gen019.svg" title="My Accounts" fontIcon="bi-layers" />
                </>
            ) : (
                ''
            )}

            <AsideMenuItem to="/wallet" icon="/media/icons/duotune/finance/fin008.svg" title="Wallet" fontIcon="bi-app-indicator" />
            <AsideMenuItem to="/referral" icon="/media/icons/duotune/general/gen028.svg" title="Referral Program" fontIcon="bi-app-indicator" />
            <AsideMenuItem to="/profile" icon="/media/icons/duotune/general/gen052.svg" title="Profile" fontIcon="bi-app-indicator" />
            <AsideMenuItem to="/security" icon="/media/icons/duotune/general/gen051.svg" title="Security" fontIcon="bi-app-indicator" />
        </>
    )
}
