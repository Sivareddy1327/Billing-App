
const productInitialState = []

const productsReducers = (state = productInitialState, action) => {

    switch (action.type) {

        case "EDIT_PRODUCT": {
            return state.map((ele) => {
                if (ele._id == action.payload._id) {
                    return { ...ele, ...action.payload }
                }
                else {
                    return { ...ele }
                }
            })
        }
        case "REMOVE_PRODUCT": {
            return state.filter((ele) => {
                return ele._id != action.payload._id
            })
        }
        case "GET_PRODUCTSDATA": {
            return [...action.payload]
        }
        case "ADD_PRODUCTS": {
            return [...state, { ...action.payload }]
        }
        default: {
            return [...state]
        }
    }
}
export default productsReducers