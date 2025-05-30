import { useEffect, useState } from 'react'

import { useMobile } from './../contexts/MobileContext'

const useMobileStyles = () => {

    const { mobile, mobileWidth, mobileHeight } = useMobile()
    const [microMobile, setMicro] = useState(window.innerWidth < 500 ? true : false)


    useEffect(() => {

        window.addEventListener('load', () => {
            if (window.innerWidth < 500) setMicro(true)
            else { setMicro(false) }
        })

        window.addEventListener('resize', () => {
            if (window.innerWidth < 500) setMicro(true)
            else { setMicro(false) }
        })
    }, [])


    const containerStyles = {
        border: mobile ? '6px solid rgb(255, 255, 255)' : 'none',
        outline: '1px solid rgb(216, 214, 214)',
        width: microMobile ? 'calc(100vw)' : mobile ? `${mobileWidth}px` : '1000px',
        margin: mobile ? '0 auto' : '10px',
        padding: '10px 0px 0px 0px',
        height: microMobile ? 'calc(100vh + 70px)' : mobile ? `${mobileHeight}px` : 'none',
        borderRadius: microMobile ? '0px' : '20px',
        top: microMobile ? '-70px' : '',
        left: microMobile ? '0px' : '',
        position: microMobile ? 'absolute' : 'relative',
        backgroundColor: mobile ? 'rgb(255, 255, 255)' : '',
        transition: '0.5s',
        overflowX: 'hidden'

    }


    return { containerStyles, microMobile, setMicro }
}

export default useMobileStyles 