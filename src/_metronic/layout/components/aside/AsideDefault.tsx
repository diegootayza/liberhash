import clsx from 'clsx'
import { useLayout } from '../../core'
import { AsideMenu } from './AsideMenu'

const AsideDefault = () => {
    const { classes } = useLayout()

    return (
        <div
            id="kt_aside"
            className={clsx('aside', classes.aside.join(' '))}
            data-kt-drawer="true"
            data-kt-drawer-name="aside"
            data-kt-drawer-activate="{default: true, lg: false}"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="{default:'200px', '300px': '250px'}"
            data-kt-drawer-direction="start"
            data-kt-drawer-toggle="#kt_aside_mobile_toggle"
        >
            {/* begin::Aside menu */}
            <div className="aside-menu flex-column-fluid">
                <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
            </div>
            {/* end::Aside menu */}
        </div>
    )
}

export { AsideDefault }
