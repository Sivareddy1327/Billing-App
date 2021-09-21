import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startPostproducts, startGetproduct } from '../Actions/productActions'
import EditProducts from './EditProducts'
import Productslist from './Productslist'

const Products = (props) => {
    const [productname, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [formerrors, setFormerrors] = useState({})
    const [toggle, setToggle] = useState(false)
    const [productobj, setProductObj] = useState('')
    const errors = {}

    const dispatch = useDispatch()

    const handleAuth = () => {
        setToggle(!toggle)
    }
    const getProduct = (data) => {
        setProductObj(data)
    }
    useEffect(() => {
        dispatch(startGetproduct())
    }, [])

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
    const resetForm = () => {
        setPrice('')
        setProductName('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: productname,
            price: price,
        }
        runvalidation()
        console.log(formData)
        if (Object.keys(errors).length == 0) {
            setFormerrors({})
            dispatch(startPostproducts(formData, resetForm))
        }
        else {
            setFormerrors(errors)
        }
    }

    return (
        <div>{toggle ? (
            <div style={{ textAlign: 'center', border: "1px solid green", boxSizing: 'border-box', width: '40%', backgroundColor: 'bisque', marginRight: '100px', marginLeft: '60%', borderRadius: '4px', marginTop: '20px', padding: '10px', height: '400px' }}>
                <EditProducts productobj={productobj} handleAuth={handleAuth} />
                <button onClick={handleAuth}>Cancel</button>
            </div>

        ) : (

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <Productslist getProduct={getProduct} toggle={toggle} handleAuth={handleAuth} />
                </div>
                <div style={{ textAlign: 'center', border: "1px solid green", width: '40%', backgroundColor: 'bisque', borderRadius: '4px', marginTop: '20px', padding: '10px' }}>
                    <h1> Add Product</h1>
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
                        {formerrors && <span style={{ color: 'red' }}>{formerrors.price}</span>}<br />

                        <input type='submit' value='Add Product' style={{ backgroundColor: 'gray', borderRadius: '4px', color: 'white' }} />
                    </form>
                </div>

            </div>

        )}
        </div>
    )
}

export default Products