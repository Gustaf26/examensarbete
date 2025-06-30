import { useEffect, useState } from "react"
import { Link } from 'react-router'

import { useCreate } from "../../contexts/CreateContext"
import useMobileStyles from "../../hooks/useMobileStyles"

import useCart from '../../hooks/useCart'

import CloseIcon from '@mui/icons-material/Close';

import '../../assets/scss/cart.scss'

export default function Cart() {

    const { allProducts, setCartShowing } = useCreate()
    const { microMobile } = useMobileStyles()
    const updateCart = useCart()

    const [cartProds, setCartProds] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [prodsQty, setProdsQty] = useState(0)



    useEffect(() => {

        let cartProdsDummy;
        if (allProducts) {

            cartProdsDummy = allProducts.filter(prod => {
                return (prod.qty > 0)
            })

            let totalPriceDummy = 0
            if (cartProdsDummy) cartProdsDummy.forEach(prod => totalPriceDummy += (prod.price * prod.qty))

            let dummyQty = 0

            if (cartProdsDummy) cartProdsDummy.forEach(prod => dummyQty += prod.qty)

            setCartProds(cartProdsDummy)
            setTotalPrice(totalPriceDummy)
            setProdsQty(dummyQty)
        }

    }, [allProducts])


    return (<>
        {cartProds ? <div id="cart-container" className={microMobile ? 'micromobile' : ''}>
            <div id="main-cart-info-container">
                <CloseIcon onClick={() => setCartShowing(false)} id="close-cart-icon"></CloseIcon>
                <h6>302 SEK LEFT TO <span id="free-delivery-msg">FREE </span>DELIVERY</h6>
                <ul>
                    {cartProds ? cartProds.map(prod => {
                        return (<li key={prod.id}>
                            <div className="cart-prod-img-and-info">
                                <img alt="product-image" src={prod.thumbnail} />
                                <div className="cart-product-info">
                                    <p className="prod-in-cart-name">{prod.name}</p>
                                    <p>Product Category: {prod.category}</p>
                                    <p>Size: <b>{prod.size}</b></p>
                                </div>
                            </div>
                            <div className="cart-product-price-qty">
                                <span className="prod-in-cart-price">{prod.price * prod.qty}€</span>
                                <span className="prod-in-cart-qty">
                                    <span onClick={() => updateCart(prod, 'one-less', prod.size)}>-</span>
                                    {prod.qty}
                                    <span onClick={() => updateCart(prod, 'plus', prod.size)}>+</span>
                                </span>
                            </div>
                        </li>)
                    }) : null}
                </ul>
            </div>
            <div>
                <div id="total-container">
                    <p id="total-products-qty">You are ordering {prodsQty} products</p>
                    <p id="total-word-and-price"> <span id="total-word">TOTAL</span> <span id="total-price">{totalPrice} €</span></p>
                </div>
                <div id="cart-buttons-container">
                    <button onClick={() => setCartShowing(false)}><Link to={"/"}>Go To Checkout</Link></button>
                    <button onClick={() => setCartShowing(false)}>Keep Buying</button>
                </div>
            </div>
        </div> : null}
    </>)
}