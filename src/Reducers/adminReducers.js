const adminInitialState = {}

const adminReducers = (state = adminInitialState, action) => {

    switch (action.type) {
        case "ADMIN_DATA": {
            return { ...state, ...action.payload }
        }
        default: {
            return { ...state }
        }
    }
}

export default adminReducers