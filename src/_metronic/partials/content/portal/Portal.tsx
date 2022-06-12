import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children, className = '' }: any) => {
    const [container] = useState(document.createElement('div'))

    if (className) container.classList.add(className)

    useEffect(() => {
        document.body.appendChild(container)
        return () => {
            document.body.removeChild(container)
        }
    }, [])

    return createPortal(children, container)
}

export { Portal }
