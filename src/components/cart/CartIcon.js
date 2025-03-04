import { useEffect, useState } from "react";

import { useCreate } from "../../contexts/CreateContext";

import { NavItem } from "react-bootstrap";

import ShoppingCart from "@mui/icons-material/ShoppingCart";



const CartIcon = () => {

    const { allProducts } = useCreate()
    const [prodsIncart, setProdsInCart] = useState(0)

    useEffect(() => {

        let allProdsQty = allProducts.map(prod => prod.qty)
        allProdsQty = allProdsQty.reduce((a, b) => { return a + b }, 0)
        setProdsInCart(allProdsQty)

    }, [allProducts])

    return (<NavItem style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid brown', borderRadius: '5px', padding: '7px 10px' }}>
        {prodsIncart ? (<span id="cartProdsQty">{prodsIncart}</span>) : null}
        <ShoppingCart style={{ color: 'brown' }} />
    </NavItem>)

}

export default CartIcon