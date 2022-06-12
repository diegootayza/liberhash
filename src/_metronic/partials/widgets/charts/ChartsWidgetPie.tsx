import { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSS } from '../../../assets/ts/_utils'

const ChartsWidgetPie = ({ className, chartsData, isLoading }: any) => {
    const chartRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!chartRef.current) {
            return
        }

        const height = parseInt(getCSS(chartRef.current, 'height'))
        let charOptions = getChartOptions(height, chartsData)
        charOptions!.series = chartsData.series.data
        charOptions!.labels = chartsData.datasets

        const chart = new ApexCharts(chartRef.current, charOptions)
        if (chart) {
            chart.render()
        }

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef, chartsData, isLoading])

    return (
        <div className={`card ${className}`}>
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">Capital Distribution</span>
                </h3>
            </div>
            <div className="card-body">
                {isLoading ? (
                    <span className="spinner-border spinner-border-sm align-middle ms-12"></span>
                ) : (
                    <div ref={chartRef} id="kt_charts_widget_3_chart" style={{ height: '350px' }}></div>
                )}
            </div>
        </div>
    )
}

export { ChartsWidgetPie }

function getChartOptions(height: number, chartsData: any): ApexOptions {
    return {
        series: [],
        labels: [],
        chart: {
            fontFamily: 'inherit',
            type: 'donut',
            height: 350,
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: any) {
                return parseFloat(val).toFixed(2) + '%'
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: false,
                    },
                },
            },
        },
        fill: {
            type: 'solid',
            opacity: 1,
        },
        stroke: {
            curve: 'smooth',
            show: true,
            width: 1,
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
                    return '$' + val
                },
            },
        },
    }
}
