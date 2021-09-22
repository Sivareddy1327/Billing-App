import React from 'react'
import { Link, Route, withRouter } from "react-router-dom"
import PrivateRoute from './PrivateRoute'
import Admin from './Admin'
import Bills from './Bills'
import Customers from './Customers'
import Login from './Login'
import Products from './Products'
import Register from './Register'
import swal from 'sweetalert'
import "./Navbar.css"
import Home from './Home'
import { MdHome } from 'react-icons/md';
import { FaRegIdCard } from 'react-icons/fa'
import { AiOutlineLogin } from 'react-icons/ai'

const Navbar = (props) => {
  const { loggedin, handleAuth } = props
  return (
    <div>    
      {loggedin ? (
        <>
          <div>
          <div style={{ backgroundColor: '#f1f1f1', padding: '30px' }}>
            <Link className='text' to="/admin">Dashboard</Link>
            <Link className='text' to='/customers'>Customers</Link>
            <Link className='text' to="/products">Products</Link>
            <Link className='text' to="/bills">Bills</Link>
            <Link className='text' style={{ marginLeft: '800px' }} to="/" onClick={() => {
              localStorage.removeItem('token')
              handleAuth()
              swal('Successfully Logout')
              props.history.push('/')
            }}>Logout</Link>
            </div>
            <>
            <PrivateRoute path="/admin" component={Admin} exact={true} />
            <PrivateRoute path='/customers' component={Customers} exact={true} />
            <PrivateRoute path='/products' component={Products} exact={true} />
            <PrivateRoute path='/bills' component={Bills} exact={true} />
            </>
          </div>
        </>  
      ) : (
        <>
          <div>
            <ul>
              <div>
                <li><Link className='txt' to='/'><MdHome style={{ textAlign: 'center', position: 'relative', marginTop: '10px' }} />Home</Link></li>
                <li><Link className='txt' to='/register'><FaRegIdCard style={{ textAlign: 'center', position: 'relative' }} />Register</Link></li>
                <li><Link className='txt' to='/login'><AiOutlineLogin style={{ textAlign: 'center', position: 'relative' }} />Login</Link></li>
              </div>
            </ul>
            <>
            <Route path='/' component={Home} exact={true} />
      <Route path='/register' component={Register} exact={true} />
      <Route path='/login' render={() => {
        return <Login
          {...props}
          handleAuth={handleAuth}
        />
      }} exact={true} />
      </>
          </div>
        </>
      )}

    </div>
  )
}
export default withRouter(Navbar)