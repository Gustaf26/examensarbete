import React from "react";

import { Row } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";


const CardContainer = (props) => {

    const { admin } = useAuth();
    const { setProductOption } = useCreate();
    const { mobile, mobileHeight, mobileWidth, menuShowing, setMenuShowing } = useMobile()

    return (

        <Row onClick={(window.innerWidth < 1100 || mobile) && menuShowing ? () => setMenuShowing(false) : null}
            className="mb-5 p-0"
            style={mobile && admin ? {
                overflowY: 'scroll', height: `calc(${mobileHeight - 20}px - 3rem)`, width: `calc(${mobileWidth}px)`, margin: '3rem auto'
            } : mobile ? { width: '100%' } : { overflowY: 'hidden', display: 'flex', justifyContent: 'center' }}>
            {props.children}
        </Row>

    )
}

export default CardContainer