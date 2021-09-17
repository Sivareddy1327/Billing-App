import React from 'react'
import validator from 'validator'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startEditcustomer } from '../Actions/customerActions'


const Editcustomer = (props) => {

    const { handleAuth, customerobj } = props



    const [customername, setCustomerName] = useState(customerobj ? customerobj.name : "")
    const [mobile, setMobile] = useState(customerobj ? customerobj.mobile : "")
    const [email, setEmail] = useState(customerobj ? customerobj.email : "")
    const [formerrors, setFormerrors] = useState({})
    const errors = {}


    const dispatch = useDispatch()



    const runvalidation = () => {
        if (customername.trim().length == 0) {
            errors.customername = 'cannot be blank'
        }
        if (mobile.trim().length == 0) {
            errors.mobile = 'cannot be blank'
        }
        if (email.trim().length == 0) {
            errors.email = 'cannot be blank'
        }
        else if (!validator.isEmail(email)) {
            errors.email = 'must be XYZ@gmail.com format'
        }
    }

    const handlecustomername = (e) => {
        setCustomerName(e.target.value)
    }

    const handlemobile = (e) => {
        setMobile(e.target.value)
    }

    const handleemail = (e) => {
        setEmail(e.target.value)
    }

    const handelclick = (e) => {
        e.preventDefault()
        runvalidation()
        const data = {
            name: customername,
            mobile: mobile,
            email: email
        }
        if (Object.keys(errors).length == 0) {
            setFormerrors({})

            dispatch(startEditcustomer(data, customerobj._id))
        }
        else {
            setFormerrors(errors)
        }
        handleAuth()
    }

    return (
        <div>
            <h1>Edit customer</h1>
            <form>
                <label>Customername</label><br />
                <input
                    type='text'
                    value={customername}
                    onChange={handlecustomername}
                    style={{ marginLeft: '10px' }}
                /><br />
                {formerrors && <span style={{ color: 'red' }}>{formerrors.customername}</span>}<br />
                <label>Mobile</label><br />
                <input
                    type="text"
                    value={mobile}
                    onChange={handlemobile}
                    style={{ marginLeft: '10px' }}
                /><br />
                {formerrors && <span style={{ color: 'red' }}>{formerrors.mobile}</span>}<br />
                <label>Email</label><br />
                <input
                    type='text'
                    value={email}
                    onChange={handleemail}
                    style={{ marginLeft: '10px' }}
                /><br />
                {formerrors && <span style={{ color: 'red' }}>{formerrors.email}</span>}<br />
                <button onClick={handelclick} >Submit</button>
            </form>
        </div>
    )
}

export default Editcustomer