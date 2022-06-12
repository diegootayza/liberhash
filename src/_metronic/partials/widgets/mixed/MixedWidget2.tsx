import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { KTSVG } from '../../../helpers'
import { getCSSVariableValue } from '../../../assets/ts/_utils'

type Props = {
    className: string
    chartColor: string
    strokeColor: string
    chartHeight: string
    statsData: any
    isLoading: boolean
    user: any
}

const MixedWidget2 = ({ className, chartColor, chartHeight, strokeColor, statsData, isLoading, user }: Props) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (!chartRef.current) {
            return
        }

        const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight, chartColor, strokeColor))
        if (chart) {
            chart.render()
        }

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef])

    return (
        <div className={`card ${className}`}>
            {/* begin::Body */}
            <div className="card-body p-0">
                {/* begin::Chart */}

                {/* end::Chart */}
                {/* begin::Stats */}
                <div className="card-p position-relative">
                    {/* begin::Row */}
                    <div className="row g-0">
                        {/* begin::Col */}
                        <div className="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
                            <KTSVG path="/media/icons/duotune/general/gen032.svg" className="svg-icon-3x svg-icon-warning d-block my-2" />
                            <a href="#" className="text-warning fw-bold fs-6">
                                Cumulative PNL
                            </a>
                            <div>
                                {isLoading ? <span className="spinner-border spinner-border-sm align-middle ms-12"></span> : <h1>{statsData.data?.pnl}$</h1>}
                            </div>
                        </div>
                        {/* end::Col */}
                        {/* begin::Col */}
                        <div className="col bg-light-primary px-6 py-8 rounded-2 mb-7">
                            <KTSVG path="/media/icons/duotune/arrows/arr075.svg" className="svg-icon-3x svg-icon-primary d-block my-2" />
                            <a href="#" className="text-primary fw-bold fs-6">
                                Order Count
                            </a>
                            <div>
                                {isLoading ? <span className="spinner-border spinner-border-sm align-middle ms-12"></span> : <h1>{statsData.data?.count}</h1>}
                            </div>
                        </div>
                        {/* end::Col */}
                    </div>
                    {/* end::Row */}
                    {/* begin::Row */}
                    <div className="row g-0">
                        {/* begin::Col */}
                        <div className="col bg-light-danger px-6 py-8 rounded-2">
                            <KTSVG path="/media/icons/duotune/abstract/abs027.svg" className="svg-icon-3x svg-icon-danger d-block my-2" />
                            <a href="#" className="text-danger fw-bold fs-6 mt-2">
                                Last Symbols
                            </a>
                            <div>
                                {isLoading ? <span className="spinner-border spinner-border-sm align-middle ms-12"></span> : <h1>{statsData.data?.symbol}</h1>}
                            </div>
                        </div>
                        {/* end::Col */}
                    </div>
                    {/* end::Row */}
                </div>
                {/* end::Stats */}
            </div>
            {/* end::Body */}
        </div>
    )
}

const chartOptions = (chartHeight: string, chartColor: string, strokeColor: string): ApexOptions => {
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const borderColor = getCSSVariableValue('--bs-gray-200')
    const color = getCSSVariableValue('--bs-' + chartColor)

    return {
        series: [
            {
                name: 'Net Profit',
                data: [30, 45, 32, 70, 40, 40, 40],
            },
        ],
        chart: {
            fontFamily: 'inherit',
            type: 'area',
            height: chartHeight,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            sparkline: {
                enabled: true,
            },
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 0,
                blur: 3,
                color: strokeColor,
                opacity: 0.5,
            },
        },
        plotOptions: {},
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: 'solid',
            opacity: 0,
        },
        stroke: {
            curve: 'smooth',
            show: true,
            width: 3,
            colors: [strokeColor],
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
            },
            crosshairs: {
                show: false,
                position: 'front',
                stroke: {
                    color: borderColor,
                    width: 1,
                    dashArray: 3,
                },
            },
        },
        yaxis: {
            min: 0,
            max: 80,
            labels: {
                show: false,
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
            },
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
        },
        tooltip: {
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function (val) {
                    return '$' + val + ' thousands'
                },
            },
            marker: {
                show: false,
            },
        },
        colors: ['transparent'],
        markers: {
            colors: [color],
            strokeColors: [strokeColor],
            strokeWidth: 3,
        },
    }
}

export { MixedWidget2 }
