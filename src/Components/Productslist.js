import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startRemoveproduct } from '../Actions/productActions'
import './Productslist.css'
import { MdDelete, MdEdit } from 'react-icons/md';
const Productslist = (props) => {

    const { toggle, handleAuth, getProduct } = props

    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const productlist = useSelector((state) => {
        return state.products
    })
    const handleremove = (id) => {

        const confirmRemove = window.confirm('Are You Sure ?')
        if (confirmRemove) {
            dispatch(startRemoveproduct(id))
        }
    }
    const handleEdit = (ele) => {
        handleAuth()
        getProduct(ele)

    }
    const handleChangeSearch = (e) => {
        const input = e.target.value
        setSearch(input)

    }
    const searchlist = productlist.filter((ele) => {
        if (ele.name == search.toLowerCase()) {
            return ele
        }
    })
    return (
        <div>
            <div style={{ display: 'flex', marginTop: '10px', justifyItems: 'center' }}>
                <h1>Listing Products</h1>
                <input style={{ marginLeft: '200px', marginTop: '30px', height: '20px' }} type='text' value={search} placeholder="search by name" onChange={handleChangeSearch} />
            </div>
            <div style={{ border: "1px solid green", width: '700px', backgroundColor: 'bisque', overflow: 'scroll', height: '300px', marginTop: '20px', padding: '10px' }}>
                <table style={{ borderBottom: '1px solid #ddd ' }} className='table'>
                    <thead>
                        <tr className='tr'>
                            <th className='th'>Name</th>
                            <th className='th'>Price</th>
                            <th className='th'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search ? (
                            searchlist.map((ele) => {
                                return <tr key={ele._id} className='tr'>
                                    <td className='td'>{ele.name}</td>
                                    <td className='td'>{ele.price}</td>
                                    <td className='td'><button onClick={() => { handleEdit(ele) }}><MdEdit /></button>
                                        <button onClick={() => { handleremove(ele._id) }}><MdDelete /></button></td>
                                </tr>
                            })

                        ) : (
                            productlist.map((ele) => {
                                return <tr key={ele._id} className='tr'>
                                    <td className='td'>{ele.name}</td>
                                    <td className='td'>{ele.price}</td>
                                    <td className='td'><button onClick={() => { handleEdit(ele) }}><MdEdit /></button><button onClick={() => { handleremove(ele._id) }}><MdDelete /></button></td>
                                </tr>
                            })
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Productslist