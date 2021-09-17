import React from 'react'
import logo from '../Images/logo.jpeg'

const Home = (props) => {

    return (
        <div>
            <div>
                <h1 style={{ marginLeft: '22%', backgroundColor: 'green', padding: '20px' }}>Billing App</h1>
            </div>
            <div style={{ marginLeft: '22%', marginTop: '10px', marginRight: '50%' }}>
                <p>Billing Software is designed to keep track of sales and billing as well as invoicing of your customer and products.It helps business owner's to view all data in Dashboard.In customer page and product page you can add, update and delete specified customer and product.Finally, You can generate bill invoice and download it.</p>
            </div>
            <div style={{ position: 'relative', left: '50%', top: '100px', position: 'fixed' }}>
                <img src={logo} />
            </div>

        </div>
    )
}

export default Home