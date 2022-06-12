import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/sass/style.scss'
import { AppRoutes } from './app/routing/AppRoutes'
import { Chart, registerables } from 'chart.js'
import { createRoot } from 'react-dom/client'
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import * as _redux from './setup'
import axios from 'axios'
import store, { persistor } from './setup/redux/Store'

_redux.setupAxios(axios, store)

Chart.register(...registerables)

const container = document.getElementById('root') as any

const root = createRoot(container)

root.render(
    <MetronicI18nProvider>
        <Provider store={store}>
            {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
            <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
                <AppRoutes />
            </PersistGate>
        </Provider>
    </MetronicI18nProvider>
)
