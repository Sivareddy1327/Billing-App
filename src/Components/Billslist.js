import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startRemovebill, startViewbill } from '../Actions/billsAction'
import { startGetcustomer } from '../Actions/customerActions'
import { startGetproduct } from '../Actions/productActions'
import BillModal from './BillModal'
import './Billslist.css'
import { MdDelete } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';

const Billslist = (props) => {

    const [toggle, setToggle] = useState(false)
    const [modalisopen, setModalIsOpen] = useState(false)
    const [searchdata, setSearchData] = useState('')
    const [filterbill, setFilterBill] = useState('')
    const [view, setView] = useState({})

    console.log(view)

    const list = useSelector((state) => {
        return state.bills
    })

    const customer = useSelector((state) => {
        return state.customers
    })

    const product = useSelector((state) => {
        return state.products
    })

    useEffect(() => {
        dispatch(startGetcustomer())
        dispatch(startGetproduct())
    }, [])

    const dispatch = useDispatch()

    const handleChangeremove = (id) => {

        const confirmRemove = window.confirm('Are You Sure ?')
        if (confirmRemove) {
            dispatch(startRemovebill(id))
        }

    }

    const handleChangeView = (id) => {
        dispatch(startViewbill(id, setView))
        setToggle(!toggle)
        setModalIsOpen(!modalisopen)
    }

    const handleChangeSearch = (e) => {
        const input = e.target.value
        setSearchData(input)

        const data = customer.filter((ele) => {
            if (ele.name == input.toLowerCase()) {
                return ele
            }
        })
        console.log('ravi', data)
        const filterdata = list.filter((ele) => {

            let result

            data.forEach((element) => {
                if (ele.customer === element._id) {
                    result = ele
                }
            })

            return result

        })

        setFilterBill(filterdata)


    }


    return (
        <div>
            <div style={{ display: 'flex', marginTop: '10px', justifyItems: 'center' }} >
                <h1>Listing Bills</h1>
                <input type='text' value={searchdata} placeholder='search by name' onChange={handleChangeSearch} style={{ marginLeft: '200px', marginTop: '30px', height: '20px' }} />
            </div>
            <div style={{ border: "1px solid green", marginLeft: '0', overflow: 'scroll', height: '300px', backgroundColor: 'bisque', marginTop: '20px', padding: '10px' }} >
                <table className='table' >
                    <thead>
                        <tr className='tr'>
                            <th className='th'>Name</th>
                            <th className='th'>Date</th>
                            <th className='th'>View Details</th>
                            <th className='th'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchdata ? (
                            filterbill.map((ele, i) => {
                                return (
                                    <tr key={i} className='tr'>
                                        {customer.map((cust, i) => {
                                            if (ele.customer == cust._id) {
                                                return <td key={i}>{cust.name}</td>
                                            }
                                        })}
                                        <td className='td'>{ele.date.slice(0,10).split('-').reverse().join('-')}</td>
                                        <td className='td'><button onClick={() => { handleChangeView(ele._id) }}><GrFormView /></button></td>
                                        <td className='td'><button onClick={() => { handleChangeremove(ele._id) }}><MdDelete /></button></td>
                                    </tr>
                                )
                            })
                        ) : (
                            list.map((ele, i) => {
                                return (
                                    <tr key={i} className='tr'>
                                        {customer.map((cust, i) => {
                                            if (ele.customer == cust._id) {
                                                return <td key={i}>{cust.name}</td>
                                            }
                                        })}
                                        <td className='td'>{ele.date.slice(0,10).split('-').reverse().join('-')}</td>
                                        <td className='td'><button onClick={() => { handleChangeView(ele._id) }}><GrFormView /></button></td>
                                        <td className='td'><button onClick={() => { handleChangeremove(ele._id) }}><MdDelete /></button></td>
                                    </tr>
                                )
                            })
                        )
                        }
                    </tbody>
                </table>
            </div>
            {toggle && <BillModal setModalIsOpen={setModalIsOpen} setToggle={setToggle} modalisopen={modalisopen} view={view} />}

        </div>
    )
}

export default Billslist