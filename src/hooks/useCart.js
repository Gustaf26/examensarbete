
import { useCreate } from "../contexts/CreateContext"

function useCart() {

    const { allProducts, setProducts } = useCreate()

    const updateCart = (item, action) => {

        let productToUpdate

        let singleProd = allProducts.filter(prod => prod.id === item.id)

        if (singleProd.length) productToUpdate = singleProd[0]
        else return

        if (productToUpdate && action === 'plus') productToUpdate.qty = Number(productToUpdate.qty + 1)
        else if (productToUpdate.qty && action === 'minus' && productToUpdate.qty !== 0) Number(productToUpdate.qty -= 1)

        let allProdsDummy = allProducts.map(prod => {
            if (prod.id === item.id) prod.qty = productToUpdate.qty
            return prod
        })

        setProducts(allProdsDummy)
    }

    return updateCart
}


export default useCart