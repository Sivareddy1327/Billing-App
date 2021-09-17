
const userInitialState = []
const userReducers = (state = userInitialState, action) => {
    switch (action.type) {
        case "ADD_USERS": {
            return [...state, { ...action.payload }]
        }
        default: {
            return [...state]
        }
    }

}
export default userReducers