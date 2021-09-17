import React, { useState, useEffect } from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useSelector, useDispatch } from 'react-redux'
import { startPostbills, startgetbillsdata } from '../Actions/billsAction'
import validator from 'validator'
import Select from 'react-select'
import Billslist from './Billslist'
import SubmitModal from './SubmitModal'




const Bills = (props) => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectcustomer, setSelectCustomer] = useState('')
    const [lineItems, setLineItems] = useState([])
    const [selectoption, setSelectOption] = useState('')
    const [modal, setModal] = useState(false)
    const [modalisopen, setModalIsOpen] = useState(false)
    const [Generatebill, setGenerateBill] = useState('')
    const [formerrors, setFormerrors] = useState({})
    const errors = {}

    const customerdata = useSelector((state) => {
        return state.customers
    })

    const dispatch = useDispatch()

    const productdata = useSelector((state) => {
        return state.products
    })

    useEffect(() => {
        dispatch(startgetbillsdata())
    }, [])



    const runvalidation = () => {
        if (selectedDate == null) {
            errors.selectedDate = 'cannot be blank'
        }
        else if (!validator.isDate(selectedDate)) {
            errors.selectedDate = 'can be date format'
        }
        if (selectcustomer.length == 0) {
            errors.selectcustomer = 'cannot be blank'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            date: selectedDate,
            customer: selectcustomer.value,
            lineItems: lineItems
        }
        setModal(true)
        setModalIsOpen(true)

        console.log(modal)
        const resetForm = () => {
            setSelectedDate(null)
            setSelectCustomer('')
            setLineItems([])
        }
        runvalidation()
        if (Object.keys(errors).length == 0) {
            setFormerrors({})
            dispatch(startPostbills(formData, resetForm, setGenerateBill))

        }
        else {
            setFormerrors(errors)
        }

        console.log(formData)
    }
    const handleAddCart = (event) => {
        event.preventDefault()
        const data = {
            product: selectoption.value,
            quantity: 1
        }
        setLineItems([...lineItems, data])
        setSelectOption('')
    }
    const handleChangeIncrement = (id) => {
        const result = lineItems.map((ele) => {
            if (ele.product == id) {
                return { ...ele, quantity: ele.quantity + 1 }
            }
            else {
                return ele
            }
        })

        setLineItems(result)

    }
    const handleChangeDecrement = (id, quantity) => {
        if (quantity >= 2) {
            const result = lineItems.map((ele) => {
                if (ele.product === id) {
                    return { ...ele, quantity: ele.quantity - 1 }
                }
                else {
                    return ele
                }
            })
            setLineItems(result)

        }


    }

    const handleOptionSelect = (selectoption) => {
        setSelectOption(selectoption)
        console.log(selectoption)
    }
    const productoption = productdata.map((ele) => {
        return { value: ele._id, label: ele.name }
    })
    const handleSelectCustomer = (selectcustomer) => {
        setSelectCustomer(selectcustomer)
    }
    const customeroption = customerdata.map((ele) => {
        return { value: ele._id, label: ele.name }
    })
    const handleChangeremove = (id) => {
        const result = lineItems.filter((ele) => {
            return ele.product != id
        })
        setLineItems(result)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
                <Billslist />
            </div>
            <div style={{ textAlign: 'center', border: "1px solid green", boxSizing: 'border-box', width: '40%', backgroundColor: 'bisque', borderRadius: '4px', marginTop: '20px', padding: '10px' }}>
                <h1>Add Bill</h1>
                <form onSubmit={handleSubmit}>
                    <label>Date</label>
                    <Datepicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat='dd/mm/yyyy'
                        showYearDropdown
                        scrollableMonthYearDropdown

                    /><br />
                    {formerrors && <span style={{ color: 'red' }}>{formerrors.selectedDate}</span>}<br />
                    <label>Customer</label>
                    <br />

                    <Select value={selectcustomer} options={customeroption} onChange={handleSelectCustomer} />
                    {formerrors && <span style={{ color: 'red' }}>{formerrors.selectcustomer}</span>}<br />
                    <label>Product</label>
                    <Select style={{ width: '20%' }} value={selectoption} options={productoption} onChange={handleOptionSelect} />
                    <br />
                    {formerrors && <span style={{ color: 'red' }}>{formerrors.selectoption}</span>}
                    <br />
                    <button onClick={handleAddCart}>Add cart</button>

                    <br /><br />
                    <input type='submit' />
                </form>
                {lineItems.length != 0 &&
                    <table border='1'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        {productdata.map((product, i) => {
                                            if (ele.product == product._id) {
                                                return <td key={i}>{product.name}</td>
                                            }
                                        })}
                                        <td><button onClick={() => { handleChangeDecrement(ele.product, ele.quantity) }}>-</button>{ele.quantity}<button onClick={() => { handleChangeIncrement(ele.product) }}>+</button></td>
                                        <td><button onClick={() => { handleChangeremove(ele.product) }}>delete</button></td>
                                    </tr>
                                )
                            })}




                        </tbody>
                    </table>}
                <div>
                    {modal && <SubmitModal setModal={setModal} modalisopen={modalisopen} setModalIsOpen={setModalIsOpen} Generatebill={Generatebill} />}
                </div>


            </div>

        </div>
    )
}

export default Bills