import React,{useState,useEffect} from 'react'
import Navbar from './Components/Navbar'
import { startGetuser } from './Actions/adminActions'
import { startgetbillsdata } from './Actions/billsAction'
import { startGetproduct } from './Actions/productActions'
import { startGetcustomer } from './Actions/customerActions'
import {useDispatch} from 'react-redux'
function App(props) {
  const [loggedin,setLoggedin] = useState(false)

  const dispatch = useDispatch()

  const handleAuth = () =>{
    setLoggedin(!loggedin)
  }
  useEffect(()=>{
    if(localStorage.getItem('token'))
    {
      handleAuth()
      dispatch(startGetuser())
      dispatch(startGetcustomer())
      dispatch(startGetproduct())
      dispatch(startgetbillsdata())
    }
   
  },[])
  return (
    <div>
      <Navbar loggedin={loggedin} handleAuth={handleAuth}/>
    </div>
  );
}

export default App;
