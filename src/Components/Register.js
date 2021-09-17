import React, { useState } from 'react'
import validator from 'validator'
import { startPostuser } from '../Actions/userActions'
import { useDispatch } from 'react-redux'

const Register = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bussinessname, setBussinessname] = useState('')
    const [address, setAddress] = useState('')
    const [formerrors, setFormerrors] = useState({})
    const errors = {}
    const dispatch = useDispatch()
    const runvalidation = () => {
        if (username.trim().length == 0) {
            errors.username = 'cannot be blank'
        }
        if (email.trim().length == 0) {
            errors.email = 'cannot be blank'
        }
        else if (!validator.isEmail(email)) {
            errors.email = 'email must be XYZ@gamil.com format'
        }

        if (password.trim().length <= 8) {
            errors.password = 'password must be more than 8 characters'
        }
        if (bussinessname.trim().length == 0) {
            errors.bussinessname = 'cannot be blank'
        }
        if (address.trim().length == 0) {
            errors.address = 'cannot be blank'
        }

    }

    const handleChangeusername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangeemail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangepassword = (e) => {
        setPassword(e.target.value)
    }
    const handleChangebusinessname = (e) => {
        setBussinessname(e.target.value)
    }

    const handleChangeaddress = (e) => {
        setAddress(e.target.value)
    }
    const resetForm = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setBussinessname('')
        setAddress('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            username: username,
            email: email,
            password: password,
            businessName: bussinessname,
            address: address
        }
        console.log(formData)
        const redirectToLogin = () => {
            props.history.push('/login')
        }
        runvalidation()
        if (Object.keys(errors) == 0) {
            setFormerrors({})
            dispatch(startPostuser(formData, props, resetForm, redirectToLogin))
        }
        else {
            setFormerrors(errors)
        }
    }

    const handleClickLogin = (e) =>{
        e.preventDefault()
        props.history.push('/login')
    }

    return (
        <div>
            <div style={{ border: "1px solid green", backgroundColor: 'bisque', borderRadius: '4px', width: '40%', marginLeft: "22%", marginTop: '', padding: '10px' }}>
                <div>
                    <h1>Registration</h1>

                    <form onSubmit={handleSubmit}>
                        <label>Username</label><br />
                        <input
                            type="text"
                            value={username}
                            onChange={handleChangeusername}
                            style={{ marginLeft: '10px' }}
                        /><br />
                        {formerrors && <span style={{ color: 'red' }}>{formerrors.username}</span>}<br />
                        <label>Email</label><br />
                        <input
                            type="text"
                            value={email}
                            onChange={handleChangeemail}
                            style={{ marginLeft: "10px" }}
                        /><br />
                        {formerrors && <span style={{ color: 'red' }}>{formerrors.email}</span>}<br />
                        <label>Password</label><br />
                        <input
                            type='password'
                            value={password}
                            onChange={handleChangepassword}
                            style={{ marginLeft: '10px' }}
                        /><br />
                        {formerrors && <span style={{ color: 'red' }}>{formerrors.password}</span>}<br />
                        <label>Businessname</label><br />
                        <input
                            type='text'
                            value={bussinessname}
                            onChange={handleChangebusinessname}
                            style={{ marginLeft: '10px' }}
                        /><br />
                        {formerrors && <span style={{ color: 'red' }}>{formerrors.bussinessname}</span>}<br />
                        <label>Address</label><br />
                        <textarea
                            type='text'
                            value={address}
                            onChange={handleChangeaddress}
                            style={{ marginLeft: "10px" }}
                        >
                        </textarea><br />
                        {formerrors && <span style={{ color: 'red' }}>{formerrors.address}</span>}<br />
                        <input
                            type="submit"
                            value='register'
                            style={{ backgroundColor: 'gray', borderRadius: '4px', color: 'white' }}
                        />
                        <h4>Already have account <a onClick={handleClickLogin} href='/' style={{textDecoration:'none'}}>Login</a></h4>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register