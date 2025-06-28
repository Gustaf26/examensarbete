
import { createContext, useState, useEffect, useRef } from "react";


export const CartContext = createContext()

export const CartContextProvider = (props) => {

    const [cartShowing, setCartShowing] = useState(false)
    const [prodsIncart, setProdsInCart] = useState(0)


    const values = {
        cartShowing,
        setCartShowing,
        prodsIncart,
        setProdsInCart
    }

    return (<CartContext.Provider value={values}>
        {props.children}
    </CartContext.Provider>)
}