import { useMobile } from './../contexts/MobileContext'


const useMobileStyles = () => {

    const { mobile, mobileWidth, mobileHeight } = useMobile()



    const containerStyles = {
        border: mobile ? '2px solid lightgrey' : 'none',
        width: mobile ? `${mobileWidth}px` : '1000px',
        margin: mobile ? '0 auto' : '10px',
        padding: '10px 10px 0px 10px',
        height: mobile ? `${mobileHeight}px` : 'none',
        borderRadius: '20px',
        position: 'relative',
        backgroundColor: mobile ? 'rgb(255, 255, 255)' : '',
        transition: '0.5s',
    }

    return containerStyles
}

export default useMobileStyles 