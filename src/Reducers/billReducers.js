const billInitialState = []

const billReducers = (state = billInitialState, action) => {
    switch (action.type) {
        case "REMOVE_BILL": {
            return state.filter((ele) => {
                return ele._id != action.payload._id
            })
        }
        case "GET_BILLS": {
            return [...action.payload]
        }
        case "POST_BILLS": {
            return [...state, { ...action.payload }]
        }
        case 'VIEW_BILL': {
            return [action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default billReducers