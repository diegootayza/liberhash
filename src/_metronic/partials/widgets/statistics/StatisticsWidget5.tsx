import { KTSVG } from '../../../helpers'

const StatisticsWidget5 = ({ className, color, svgIcon, iconColor, title, description }: any) => {
    return (
        <a href="#" className={`card bg-${color} hoverable ${className}`}>
            {/* begin::Body */}
            <div className="card-body">
                <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} />

                <div className={`text-inverse-${color} fw-bolder fs-2 mb-2 mt-5`}>{title}</div>

                <div className={`fw-bold text-inverse-${color} fs-7`}>{description}</div>
            </div>
            {/* end::Body */}
        </a>
    )
}

export { StatisticsWidget5 }
