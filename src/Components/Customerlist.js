import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StartRemoveCustomer } from '../Actions/customerActions'
import Editcustomer from './Editcustomer'
import './Customerlist.css'
import { MdDelete, MdEdit } from 'react-icons/md';


const Customerlist = (props) => {

    const { handleAuth, getId } = props

    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const customerlist = useSelector((state) => {
        return state.customers
    })

    const handleremove = (id) => {
        const confirmRemove = window.confirm('Are You Sure ?')
        if (confirmRemove) {
            dispatch(StartRemoveCustomer(id))
        }

    }
    const handleChangeSearch = (e) => {
        const input = e.target.value
        setSearch(input)

    }
    const searchlist = customerlist.filter((ele) => {
        if (ele.name.toLowerCase() == search.toLowerCase()) {
            return ele
        }
    })

    const handleedit = (ele) => {
        getId(ele)
        handleAuth()
    }

    return (
        <div>
            <div style={{ display: 'flex', marginTop: '10px', justifyItems: 'center' }}>
                <h1>Listing Customers</h1>
                <input type='text' style={{ marginLeft: '200px', marginTop: '30px', height: '20px' }} value={search} placeholder="search by name" onChange={handleChangeSearch} />
            </div>
            <div style={{ border: "1px solid green", marginLeft: '0', overflow: 'scroll', height: '300px', backgroundColor: 'bisque', marginTop: '20px', padding: '10px' }}>
                <table className='table'>
                    <thead>
                        <tr className='tr'>
                            <th className='th'>Name</th>
                            <th className='th'>Mobile</th>
                            <th className='th'>Email</th>
                            <th className='th'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search ? (

                            searchlist.map((ele) => {
                                return <tr key={ele._id} className='tr'>
                                    <td className='td'>{ele.name}</td>
                                    <td className='td'>{ele.mobile}</td>
                                    <td className='td'>{ele.email}</td>
                                    <td className='td'><button><MdEdit /></button><button onClick={() => { handleremove(ele._id) }}><MdDelete /></button></td>
                                </tr>
                            })

                        ) : (

                            customerlist.map((ele) => {
                                return <tr key={ele._id} className='tr'>
                                    <td className='td'>{ele.name}</td>
                                    <td className='td'>{ele.mobile}</td>
                                    <td className='td'>{ele.email}</td>
                                    <td className='td'><button onClick={() => { handleedit(ele) }}><MdEdit /></button><button onClick={() => { handleremove(ele._id) }}><MdDelete /></button></td>
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

export default Customerlist