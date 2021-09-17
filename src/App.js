import React,{useState,useEffect} from 'react'
import Navbar from './Components/Navbar'
function App(props) {
  const [loggedin,setLoggedin] = useState(false)

  const handleAuth = () =>{
    setLoggedin(!loggedin)
  }
  useEffect(()=>{
    if(localStorage.getItem('token'))
    {
      handleAuth()
    }
   
  },[])
  return (
    <div>
      <Navbar loggedin={loggedin} handleAuth={handleAuth}/>
    </div>
  );
}

export default App;
