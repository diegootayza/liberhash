import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../AssetHelpers'

const KTSVG = ({ className = '', path, svgClassName = 'mh-50px' }: any) => {
    return (
        <span className={`svg-icon ${className}`}>
            <SVG src={toAbsoluteUrl(path)} className={svgClassName} />
        </span>
    )
}

export { KTSVG }
