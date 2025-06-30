export const productReducer = (state, action) => {

    switch (action.type) {
        case ('prod-name'):
            return {
                ...state,
                name: action.name,
            }
        case ('prod-description'):
            return {
                ...state,
                description: action.description
            }
        case ('prod-image'):
            return {
                ...state,
                thumbnail: action.thumbnail
            }
        case ('prod-price'):
            return {
                ...state,
                price: action.price,
            }
        case ('prod-category'):
            return {
                ...state,
                category: action.category
            }
        default:
            return action.singleProduct
    }
}
