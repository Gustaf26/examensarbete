import { useEffect, useState } from "react"

import { useCreate } from "../../contexts/CreateContext"

import '../../assets/scss/cart.scss'

export default function Cart() {

    const { allProducts } = useCreate()

    const [cartProds, setCartProds] = useState([])

    useEffect(() => {

        let cartProdsDummy;
        if (allProducts) {

            cartProdsDummy = allProducts.filter(prod => {
                return (prod.qty > 0)
            })

            setCartProds(cartProdsDummy)
        }

    }, [allProducts])


    return (<>
        {cartProds ? <div id="cart-container">
            <ul>
                {cartProds ? cartProds.map(prod => {
                    return (<li>
                        <img alt="product-image" src={prod.thumbnail} />
                        <div className="cart-product-info">
                            <p className="prod-in-cart-name">{prod.name}</p>
                            <p>Product Category: {prod.category}</p>
                        </div>
                        <div className="cart-product-price-qty">
                            <span className="prod-in-cart-price">{prod.price}€</span>
                            <span className="prod-in-cart-qty"><span>-</span>{prod.qty}<span>+</span></span>
                        </div>
                    </li>)
                }) : null}
            </ul>
        </div> : null}
    </>)
}