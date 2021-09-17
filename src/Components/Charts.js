import React from 'react'
import { useSelector } from 'react-redux'
import { Chart } from 'react-google-charts'


const Charts = () => {

    const customerdata = useSelector((state) => {
        return state.customers
    })
    const productdata = useSelector((state) => {
        return state.products
    })
    const billsdata = useSelector((state) => {
        return state.bills
    })

    const chartsdata = () => {
        if (billsdata) {
            const data = []
            const datearray = billsdata.map((ele) => {
                return ele.date.slice(0, 10)
            })
            datearray.map((ele) => {
                if (data.includes(ele)) {
                    return ele
                }
                else {
                    data.push(ele)
                }
            })
            const obj = {}
            billsdata.map((ele) => {
                if (obj.hasOwnProperty(ele.date.slice(0, 10))) {
                    obj[ele.date.slice(0, 10)] += 1
                }
                else {
                    obj[ele.date.slice(0, 10)] = 1
                }
            })
            let result = [["Date", "Sales"]]
            for (const key in obj) {
                result.push([key, obj[key]])
            }
            return result
        }
        else {
            return []
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ marginTop: '20px' }}>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Task', 'Hours per Day'],
                        ['Customers', customerdata.length],
                        ['Products', productdata.length],
                        ['Bills', billsdata.length],
                    ]}
                    options={{
                        title: 'My App',
                        is3D: true,
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={chartsdata()}
                    options={{
                        // Material design options
                        chart: {
                            title: 'Daily Sales',
                        },
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        </div>
    )
}
export default Charts