import { toAbsoluteUrl } from '../../../helpers'

type Props = {
    className: string
    image: string
    title: string
    time: string
    description: string
}

const StatisticsWidget1 = ({ className, image, title, time, description }: Props) => {
    return (
        <div
            className={`card bgi-no-repeat ${className}`}
            style={{
                backgroundPosition: 'right top',
                backgroundSize: '30% auto',
                backgroundImage: `url(${toAbsoluteUrl('/media/svg/shapes/' + image)})`,
            }}
        >
            {/* begin::Body */}
            <div className="card-body">
                <a href="#" className="card-title fw-bolder text-muted text-hover-primary fs-4">
                    {title}
                </a>

                <div className="fw-bolder text-primary my-6">{time}</div>

                <p className="text-dark-75 fw-bold fs-5 m-0" dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
            {/* end::Body */}
        </div>
    )
}

export { StatisticsWidget1 }
