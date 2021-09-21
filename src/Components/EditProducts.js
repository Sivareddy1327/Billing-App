import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startPutProduct } from '../Actions/productActions'
const EditProducts = (props) => {

    const { handleAuth, productobj } = props

    const [productname, setProductName] = useState(productobj ? productobj.name : '')
    const [price, setPrice] = useState(productobj ? productobj.price : '')
    const [formerrors, setFormerrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const uniqueid = useSelector((state) => {
        return state.uniqueproduct
    })


    const handleChangeproductname = (e) => {
        setProductName(e.target.value)
    }

    const handleChangeprice = (e) => {
        setPrice(e.target.value)
    }
    const runvalidation = () => {
        if (productname.trim().length == 0) {
            errors.productname = 'cannot be blank'
        }
        if (price.length == 0) {
            errors.price = 'cannot be blank'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: productname,
            price: price,
        }
        handleAuth()
        runvalidation()
        console.log(formData)
        if (Object.keys(errors).length == 0) {
            setFormerrors({})
            dispatch(startPutProduct(productobj._id, formData))
        }
        else {
            setFormerrors(errors)
        }
    }

    return (
        <div >
            <h1>Edit product</h1>
            <form onSubmit={handleSubmit}>
                <label>Productname</label><br />
                <input
                    type='text'
                    value={productname}
                    onChange={handleChangeproductname}
                    style={{ marginLeft: '10px' }}
                /><br />
                {formerrors && <span style={{ color: 'red' }}>{formerrors.productname}</span>}<br />
                <label>Price</label><br />
                <input
                    type="text"
                    value={price}
                    onChange={handleChangeprice}
                    style={{ marginLeft: '10px' }}
                /><br />
                {formerrors && <span style={{ color: 'red' }}>{formerrors.mobile}</span>}<br />

                <input type='submit'  style={{ backgroundColor: 'gray', borderRadius: '4px', color: 'white' }} />
            </form>
        </div>
    )
}

export default EditProducts