import { createContext, useContext, useState, useEffect } from "react";


const MobileContext = createContext();

const useMobile = () => {
    return useContext(MobileContext);
};

const MobileContextProvider = (props) => {

    const [mobileDisplays, setMobileDisplays] = useState(false)
    const [mobileWidth, setMobileWidth] = useState(400);
    const [mobileHeight, setMobileHeight] = useState(750);
    const [mobile, setMobile] = useState(false)
    const [menuShowing, setMenuShowing] = useState(true)

    const contextValues = {
        setMobile,
        mobile,
        mobileDisplays,
        setMobileDisplays,
        mobileHeight,
        mobileWidth,
        setMobileHeight,
        setMobileWidth,
        menuShowing, setMenuShowing
    };

    useEffect(() => {

        if (window.innerWidth < 1000) setMobile(true);
    }, [])

    return (
        <MobileContext.Provider value={contextValues}>
            {props.children}
        </MobileContext.Provider>
    );
};

export { MobileContext, useMobile, MobileContextProvider };
