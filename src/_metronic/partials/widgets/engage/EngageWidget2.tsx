import clsx from 'clsx'

const EngageWidget2 = ({ className, imagePath = '', innerPadding = '', color = 'primary' }: any) => {
    return (
        <div className={`card overflow-hidden ${className}`}>
            <div className={`card-body p-0 d-flex card-rounded bg-light-${color}`}>
                <div className="py-18 px-12">
                    <h3 className="fs-2x">
                        <a href="#" className="text-dark text-hover-primary fw-bolder">
                            Nike Sneakers
                        </a>
                    </h3>
                    <div className={clsx('fs-3', `text-${color}`)}>Get Amazing Nike Sneakers</div>
                </div>
                {imagePath && (
                    <div
                        className="d-none d-md-flex flex-row-fluid bgi-no-repeat bgi-position-y-center bgi-position-x-right bgi-size-cover"
                        style={{
                            transform: 'translateX(10%) rotate(-26deg)',
                            backgroundImage: `url('${imagePath}')`,
                        }}
                    ></div>
                )}
            </div>
        </div>
    )
}

export { EngageWidget2 }