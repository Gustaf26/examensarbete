
import { useCreate } from "../contexts/CreateContext"

function useCart() {

    const { allProducts, setProducts } = useCreate()

    const updateCart = (item, action, size) => {

        let productToUpdate

        let singleProd = allProducts.filter(prod => prod.id === item.id)

        if (singleProd.length > 0) productToUpdate = singleProd[0]
        else return

        let allProdsDummy = [...allProducts]

        allProdsDummy = allProdsDummy.map(prod => {
            if (prod.id === productToUpdate.id) {
                if (action === 'plus') { prod.qty += 1; prod.size = size; }
                else if (action === 'one-less') { prod.qty -= 1; prod.size = size }
                else if (action === 'minus' && prod.qty !== 0) { prod.qty = 0; prod.size = size }
            }

            return prod
        })

        setProducts(allProdsDummy)
    }

    return updateCart
}


export default useCart