import React from "react";
import { useLocation } from 'react-router-dom'
import { Row } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { useMobile } from "../../contexts/MobileContext";

import useMobileStyles from "../../hooks/useMobileStyles";


const CardContainer = (props) => {

    const { admin } = useAuth();
    const location = useLocation()
    const { mobile, mobileHeight, mobileWidth, menuShowing, setMenuShowing } = useMobile()
    const { microMobile } = useMobileStyles()

    return (

        <Row onClick={(window.innerWidth < 1100 || mobile) && menuShowing ? () => setMenuShowing(false) : null}
            className="mb-5 p-0"
            style={mobile && admin && !microMobile ? {
                height: `calc(${mobileHeight - 20}px - 3rem)`,
                width: `calc(${mobileWidth}px)`,
                margin: '7.5rem auto'
            } : microMobile && admin ? {
                height: 'fit-content',
                margin: '7.5rem auto',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            } : mobile ? { width: '100vw', justifyContent: 'center' }
                : {
                    minWidth: (location.pathname === '/cms/index')
                        || (location.pathname === '/') ? '50%' : '360px',
                    height: 'fit-content', overflowY: 'hidden',
                    display: 'flex', justifyContent: 'center',
                    margin: (location.pathname === '/cms/index')
                        || (location.pathname === '/') ? '5rem auto' : '0 auto'
                }}>
            {props.children}
        </Row>

    )
}

export default CardContainer