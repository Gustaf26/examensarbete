import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";


const MobileContext = createContext();

const useMobile = () => {
    return useContext(MobileContext);
};

const MobileContextProvider = (props) => {

    const [mobileDisplays, setMobileDisplays] = useState(false)
    const [mobileWidth, setMobileWidth] = useState(400);
    const [mobileHeight, setMobileHeight] = useState(750);
    const [mobile, setMobile] = useState(window.innerWidth < 1000 ? true : false)
    const [menuShowing, setMenuShowing] = useState(true)
    const [fullScreen, setFullScreen] = useState(false)
    const { admin } = useAuth()


    const contextValues = {
        setMobile,
        mobile,
        mobileDisplays,
        setMobileDisplays,
        mobileHeight,
        mobileWidth,
        setMobileHeight,
        setMobileWidth,
        menuShowing, setMenuShowing,
        fullScreen, setFullScreen

    };

    useEffect(() => {


        window.addEventListener('resize', () => {
            if (window.innerWidth < 1000) setMobile(true);
            setFullScreen(false)
        })
        window.addEventListener('load', () => {
            if (window.innerWidth < 1000) setMobile(true);
        })
    }, [window.innerWidth])

    return (
        <MobileContext.Provider value={contextValues}>
            <div style={{ minHeight: mobile && !admin ? '120vh' : mobile && admin ? '100vh' : 'fit-content' }}>
                {props.children}
            </div>
        </MobileContext.Provider>
    );
};

export { MobileContext, useMobile, MobileContextProvider };
