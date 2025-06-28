import { useEffect, useState, useRef } from "react"

import { useCreate } from "../../contexts/CreateContext"

import '../../assets/scss/cart.scss'

export default function Cart() {

    const { allProducts } = useCreate()

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
        {cartProds ? <div id="cart-container">
            <div>
                <h6>302 SEK LEFT TO <span id="free-delivery-msg">FREE DELIVERY</span></h6>
                <ul>
                    {cartProds ? cartProds.map(prod => {
                        return (<li>
                            <div className="cart-prod-img-and-info">
                                <img alt="product-image" src={prod.thumbnail} />
                                <div className="cart-product-info">
                                    <p className="prod-in-cart-name">{prod.name}</p>
                                    <p>Product Category: {prod.category}</p>
                                </div>
                            </div>
                            <div className="cart-product-price-qty">
                                <span className="prod-in-cart-price">{prod.price}€</span>
                                <span className="prod-in-cart-qty"><span>-</span>{prod.qty}<span>+</span></span>
                            </div>
                        </li>)
                    }) : null}
                </ul>
            </div>
            <div>


                <div id="total-container">
                    <p>{prodsQty} products</p>
                    <p> <span id="total-word">TOTAL</span> {totalPrice} €</p>
                </div>
                <div id="cart-buttons-container">
                    <button>Go To Checkout</button>
                    <button>Keep Buying</button>
                </div>
            </div>
        </div> : null}
    </>)
}