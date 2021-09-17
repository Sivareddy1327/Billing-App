import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { startPostlogin } from '../Actions/userActions'
import login from '../Images/login.jpeg'

const Login = (props) => {

    const { handleAuth } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formerrors, setFormerrors] = useState({})
    const errors = {}
    const dispatch = useDispatch()
    const handleChangeemail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangepassword = (e) => {
        setPassword(e.target.value)
    }
    const runvalidation = () => {
        if (email.trim().length === 0) {
            errors.email = 'cannot be blank'
        }
        else if (!validator.isEmail(email)) {
            errors.email = "must be XYZ@gmail.com format"
        }
        if (password.trim().length <= 8) {
            errors.password = 'must be more than 8 characters'
        }
    }
    const resetForm = () => {
        setEmail('')
        setPassword('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        runvalidation()
        if (Object.keys(errors).length === 0) {
            setFormerrors({})
            const formData = {
                email: email,
                password: password
            }
            const redirectToAdmin = () => {
                props.history.push('/admin')
            }
            dispatch(startPostlogin(formData, handleAuth, resetForm, redirectToAdmin))

        }
        else {
            setFormerrors(errors)
        }
    }
    const handleClickRegister=(e)=>{
        e.preventDefault()
        props.history.push('/register')
    }
    return (
        <div>
            <div style={{ border: "1px solid green", borderRadius: '4px', backgroundColor: 'bisque', width: '40%', marginLeft: "22%", marginTop: '20px', padding: '10px' }}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>email</label><br />
                    <input
                        type='text'
                        value={email}
                        onChange={handleChangeemail}
                        style={{ marginLeft: '10px' }}
                    /><br />
                    {formerrors && <span style={{ color: "red" }}>{formerrors.email}</span>}<br />
                    <label>password</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={handleChangepassword}
                        style={{ marginLeft: '10px' }}
                    /><br />
                    {formerrors && <span style={{ color: "red" }}>{formerrors.password}</span>}<br />
                    <input
                        className="color"
                        type="submit"
                        value="login"
                        style={{ backgroundColor: 'gray', color: 'white', borderRadius: '4px' }}
                    />
                    <button style={{marginLeft:'20px',borderRadius :'4px',color :'white',backgroundColor:'gray'}} onClick={handleClickRegister}>Register</button>
                </form>
                
            </div>
            <div style={{ position: 'fixed', left: '35%' }}>
                <img src={login} height='400px' width='600' />
            </div>
        </div>
    )
}

export default Login