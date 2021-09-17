import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import html2pdf from 'html2pdf.js'

Modal.setAppElement('#root')

const SubmitModal = (props) => {


    const { setModal, modalisopen, setModalIsOpen, Generatebill } = props
    const [Total, setTotal] = useState('')
    console.log(props)

    const customer = useSelector((state) => {
        return state.customers
    })

    const product = useSelector((state) => {
        return state.products
    })

    const handleChangeclose = () => {
        setModalIsOpen(false)
        setModal(false)
    }
    const handleGenerate = () => {
        const opt = {
            margin: 1,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf(document.getElementById('downloadbill'), opt);
    }

    return (
        <div>
            <Modal isOpen={modalisopen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => { setModalIsOpen(false) }}>
                <div id='downloadbill'>
                    <h1>Invoice Bill</h1>
                    <h4>Date : {Object.keys(Generatebill).length != 0 && Generatebill.date.slice(0, 10).split('-').reverse().join('-')}</h4>
                    {Object.keys(Generatebill).length != 0 && customer.map((ele, i) => {
                        if (ele._id == Generatebill.customer) {
                            return <h2 key={i}>Customer name : {ele.name}</h2>
                        }
                    })

                    }

                    <hr />
                    <table>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Product price</th>
                                <th>Quantity</th>
                                <th>subTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(Generatebill).length != 0 && Generatebill.lineItems.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        {product.map((pro, index) => {
                                            if (ele.product == pro._id) {
                                                return <td key={index}>{pro.name}</td>
                                            }

                                        })
                                        }
                                        {
                                            product.map((pro, index) => {
                                                if (ele.product == pro._id) {
                                                    return <td key={index}>{pro.price}</td>
                                                }
                                            })
                                        }
                                        <td>{ele.quantity}</td>
                                        <td>{ele.subTotal}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>

                    {Object.keys(Generatebill).length != 0 && <h1 style={{ backgroundColor: 'red', color: 'white' }}>Total : {Generatebill.total}</h1>}
                </div>
                <button onClick={handleGenerate} style={{ backgroundColor: 'red', borderRadius: '4px', color: 'white' }}>Generate</button>
                <button onClick={handleChangeclose} style={{ backgroundColor: 'blue', borderRadius: '4px', color: 'white', margin: '20px' }}>close</button>
            </Modal>
        </div>
    )
}

export default SubmitModal