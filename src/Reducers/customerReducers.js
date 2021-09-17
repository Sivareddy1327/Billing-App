
const customerIntialState = []

const customerReducers = (state = customerIntialState, action) => {

    switch (action.type) {
        case "EDIT_CUSTOMER": {
            return state.map((ele) => {
                if (ele._id == action.payload._id) {
                    return { ...ele, ...action.payload }
                }
                else {
                    return { ...ele }
                }
            })
        }
        case "REMOVE_CUSTOMER": {
            return state.filter((ele) => {
                return ele._id != action.payload._id
            })
        }
        case "GET_CUSTOMERSDATA": {
            return [...action.payload]
        }
        case "ADD_CUSTOMERDATA": {
            return [...state, { ...action.payload }]
        }
        default: {
            return [...state]
        }
    }
}

export default customerReducers