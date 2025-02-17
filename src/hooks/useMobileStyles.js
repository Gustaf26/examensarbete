import { useEffect, useState } from 'react'

import { useMobile } from './../contexts/MobileContext'

const useMobileStyles = () => {

    const { mobile, mobileWidth, mobileHeight } = useMobile()
    const [microMobile, setMicro] = useState(window.innerWidth < 500 ? true : false)


    // useEffect(() => {

    //     window.addEventListener('load', () => {
    //         if (window.innerWidth < 500) setMicro(true)
    //     })

    //     window.addEventListener('resize', () => {
    //         if (window.innerWidth < 500) setMicro(true)
    //     })
    // }, [])


    const containerStyles = {
        border: mobile ? '6px solid rgb(255, 255, 255)' : 'none',
        outline: '1px solid rgb(216, 214, 214)',
        width: microMobile ? 'calc(100vw - 40px)' : mobile ? `${mobileWidth}px` : '1000px',
        margin: mobile ? '0 auto' : '10px',
        padding: '10px 0px 0px 0px',
        height: microMobile ? 'calc(100vh + 70px)' : mobile ? `${mobileHeight}px` : 'none',
        borderRadius: '20px',
        top: microMobile ? '-70px' : '',
        left: microMobile ? '25px' : '',
        position: microMobile ? 'absolute' : 'relative',
        backgroundColor: mobile ? 'rgb(255, 255, 255)' : '',
        transition: '0.5s',
        // boxShadow: '1px 1px 3px rgb(156, 153, 153)'

    }


    return { containerStyles, microMobile }
}

export default useMobileStyles 