import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import adminReducers from '../Reducers/adminReducers'
import userReducers from '../Reducers/userReducers'
import customerReducers from '../Reducers/customerReducers'
import productsReducers from '../Reducers/productsReducers'
import billReducers from '../Reducers/billReducers'

const configurationStore = () => {
    const store = createStore(combineReducers({
        user: userReducers,
        admindata: adminReducers,
        customers: customerReducers,
        products: productsReducers,
        bills: billReducers
    }), applyMiddleware(thunk))
    return store
}
export default configurationStore