import { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../setup'

const PrivateRoutes = () => {
    const MyAccountPageWrapper = lazy(() => import('../pages/myaccount/MyAccountPageWrapper'))
    const WalletPageWrapper = lazy(() => import('../pages/wallet/WalletPageWrapper'))
    const BinanceAccountPageWrapper = lazy(() => import('../pages/binanceaccount/BinanceAccountPageWrapper'))
    const ReferralAccountPageWrapper = lazy(() => import('../pages/referral/ReferralAccountPageWrapper'))
    const ProfilePageWrapper = lazy(() => import('../pages/profile/ProfilePageWrapper'))
    const SecurityPageWrapper = lazy(() => import('../pages/security/SecurityPageWrapper'))
    const TokenRegisterWrapper = lazy(() => import('../pages/tokenRegister/TokenRegisterWrapper'))
    const cryp_id = useSelector<RootState>(({ auth }) => auth!.user!.cryp_id, shallowEqual)
    return (
        <Routes>
            <Route element={<MasterLayout />}>
                {/* Redirect to Dashboard after success login/registartion */}
                {typeof cryp_id !== 'object' ? (
                    <>
                        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
                        <Route path="tokenregister" element={<Navigate to="/dashboard" />} />
                        {/* Pages */}
                        <Route path="dashboard" element={<DashboardWrapper />} />
                        <Route path="myaccount" element={<MyAccountPageWrapper />} />
                        <Route path="wallet" element={<WalletPageWrapper />} />
                        <Route path="binance" element={<BinanceAccountPageWrapper />} />
                        <Route path="referral" element={<ReferralAccountPageWrapper />} />
                        <Route path="binance" element={<BinanceAccountPageWrapper />} />
                        <Route path="profile" element={<ProfilePageWrapper />} />
                        <Route path="security" element={<SecurityPageWrapper />} />

                        <Route path="menu-test" element={<MenuTestPage />} />
                        {/* Page Not Found */}
                        <Route path="*" element={<Navigate to="/error/404" />} />
                    </>
                ) : (
                    <>
                        <Route path="*" element={<Navigate to="/tokenRegister" />} />
                        <Route path="tokenregister" element={<TokenRegisterWrapper />} />
                    </>
                )}
            </Route>
        </Routes>
    )
}

export { PrivateRoutes }
