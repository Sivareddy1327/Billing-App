import React,{useState,useEffect} from 'react'
import validator from 'validator'
import {useDispatch,useSelector} from 'react-redux'
import {startPostcustomer,startGetcustomer} from '../Actions/customerActions'
import Customerlist from './Customerlist'
import Editcustomer from './Editcustomer'


const Customers = (props) =>{

    const [customername,setCustomerName] = useState('')
    const [mobile,setMobile] = useState('')
    const [email,setEmail] = useState('')
    //const [toggle,setToggle] = useState(false)
    const [customerobj,setCustomerObj] = useState('')
    const [formerrors,setFormerrors] = useState({})
    const errors = {}
    let uniqueId

    const dispatch = useDispatch()

    const handleAuth = () =>{
        setToggle(!toggle)
    }
    const getId = (data)=>{
            setCustomerObj(data)
    
    }

    const customerdata = useSelector((state)=>{
        return state.customer
    })
    
    useEffect(()=>{
        dispatch(startGetcustomer())
    },[])

    const handleChangecustomername = (e) =>{
        setCustomerName(e.target.value)
    }

    const handleChangemobile = (e) =>{
        setMobile(e.target.value)
    }

    const handleChangeemail = (e) =>{
        setEmail(e.target.value)
    }
    const runvalidation = () =>{
        if(customername.trim().length==0){
            errors.customername = 'cannot be blank'
        }
        if(mobile.trim().length==0)
        {
            errors.mobile='cannot be blank'
        }
        if(email.trim().length==0)
        {
            errors.email='cannot be blank'
        }
        else if(!validator.isEmail(email))
        {
            errors.email='must be XYZ@gmail.com format'
        }
    }
    const resetForm = () =>{
        setMobile('')
        setEmail('')
        setCustomerName('')
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            name : customername,
            mobile : mobile,
            email : email
        }
        runvalidation()
        console.log(formData)
        if(Object.keys(errors).length==0)
        {
            setFormerrors({})
            dispatch(startPostcustomer(formData,resetForm))
        }
        else {
            setFormerrors(errors)
        }
    }

    return (
        <div style={{display : 'flex',justifyContent : 'space-around'}}>
            {toggle ? (
                <div style={{textAlign : 'center',marginLeft : '60%',marginRight : '100px',backgroundColor : 'bisque',border : "1px solid green",boxSizing : 'border-box',width : '50%',borderRadius: '4px',marginTop : '20px',padding : '10px',height : '400px'}}>
            <Editcustomer customerobj={customerobj} handleAuth={handleAuth} getId={getId}/>
            <button onClick={handleAuth}>Cancel</button>
            </div>
             ) : (
                <>
        <div><Customerlist handleAuth={handleAuth} toggle={toggle} getId={getId}/></div>
        {<div style={{textAlign : 'center',border : "1px solid green",boxSizing : 'border-box',width : '40%',backgroundColor : 'bisque',borderRadius: '4px',marginTop : '20px',padding : '10px'}}>
            <h1>Add Customer</h1>
            <form onSubmit={handleSubmit}>
                <label>Customername</label><br/>
                <input
                   type='text' 
                   value={customername} 
                   onChange={handleChangecustomername} 
                   style={{marginLeft : '10px'}}
                /><br/>
                {formerrors&&<span style={{color : 'red'}}>{formerrors.customername}</span>}<br/>
                <label>Mobile</label><br/>
                <input
                   type="text" 
                   value={mobile} 
                   onChange={handleChangemobile} 
                   style={{marginLeft : '10px'}}
                /><br/>
                  {formerrors&&<span style={{color : 'red'}}>{formerrors.mobile}</span>}<br/>
                <label>Email</label><br/>
                <input
                   type='text' 
                   value={email} 
                   onChange={handleChangeemail} 
                   style={{marginLeft : '10px'}}
                /><br/>
                  {formerrors&&<span style={{color : 'red'}}>{formerrors.email}</span>}<br/>
                <input type='submit' value='Add Customer' style={{backgroundColor: 'gray',borderRadius:'4px',color:'white'}}/>
            </form>
            </div>}
              
              </>
            )
            }
            </div> 
             
    )
}

export default Customers