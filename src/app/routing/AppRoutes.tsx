import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage } from '../modules/auth'
import { RootState } from '../../setup'
import App from '../App'

const AppRoutes = () => {
    const isAuthorized = useSelector<RootState>(({ auth }) => auth.user, shallowEqual)
    const cryp_id = useSelector<RootState>(({ auth }) => auth?.user?.cryp_id, shallowEqual)

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route element={<App />}>
                    <Route path="error/*" element={<ErrorsPage />} />
                    <Route path="logout" element={<Logout />} />
                    {isAuthorized ? (
                        <>
                            {typeof cryp_id !== 'object' ? (
                                <>
                                    <Route index element={<Navigate to="/dashboard" />} />
                                </>
                            ) : (
                                <>
                                    <Route index element={<Navigate to="/tokenregister" />} />
                                </>
                            )}
                            <Route path="/*" element={<PrivateRoutes />} />
                        </>
                    ) : (
                        <>
                            <Route path="auth/*" element={<AuthPage />} />
                            <Route path="*" element={<Navigate to="/auth" />} />
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
