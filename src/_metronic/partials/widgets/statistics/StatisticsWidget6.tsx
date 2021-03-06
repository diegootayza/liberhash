const StatisticsWidget6 = ({ className, color, title, description, progress }: any) => {
    return (
        <div className={`card bg-light-${color} ${className}`}>
            {/* begin::Body */}
            <div className="card-body my-3">
                <a href="#" className={`card-title fw-bolder text-${color} fs-5 mb-3 d-block`}>
                    {description}
                </a>

                <div className="py-1">
                    <span className="text-dark fs-1 fw-bolder me-2">{progress}</span>

                    <span className="fw-bold text-muted fs-7">{title}</span>
                </div>

                <div className={`progress h-7px bg-${color} bg-opacity-50 mt-7`}>
                    <div className={`progress-bar bg-${color}`} role="progressbar" style={{ width: progress }} />
                </div>
            </div>
            {/* end:: Body */}
        </div>
    )
}

export { StatisticsWidget6 }
