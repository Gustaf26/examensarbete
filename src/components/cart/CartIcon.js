import { useEffect, useState } from "react";

import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import useMobileStyles from "../../hooks/useMobileStyles";

import { NavItem } from "react-bootstrap";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

const CartIcon = () => {

    const { allProducts, admin, setCartShowing, cartShowing } = useCreate()
    const [prodsIncart, setProdsInCart] = useState(0)

    const { mobile } = useMobile()

    const { microMobile } = useMobileStyles()

    useEffect(() => {

        let allProdsQty = allProducts.map(prod => prod.qty)
        allProdsQty = allProdsQty.reduce((a, b) => { return a + b }, 0)
        setProdsInCart(allProdsQty)

    }, [allProducts])

    return (<NavItem id="cart-icon" onClick={() => setCartShowing(!cartShowing)} style={{ marginLeft: !(mobile && admin) && !microMobile ? '20px' : '', border: mobile ? '1px solid brown' : '1px solid rgb(210, 129, 37)', }}>
        {prodsIncart ? (<span style={{ border: mobile ? '1px solid brown' : '1px solid rgb(210, 129, 37)' }}
            id="cartProdsQty">{prodsIncart}</span>) : null}
        <ShoppingCart style={{ color: mobile ? 'brown' : 'rgb(210, 129, 37)' }} />
    </NavItem>)

}

export default CartIcon