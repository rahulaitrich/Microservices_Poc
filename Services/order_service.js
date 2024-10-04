const express = require('express')
const fs = require('fs')
const path = require('path')
const axios = require('axios');
const app = express()

app.use(express.json())


const orderpath = path.join(__dirname,"orders.json")

const getordersfromfile = () =>{
    const data = fs.readFileSync(orderpath,'utf-8')
    return JSON.parse(data)
}

app.get('/orders',(req,res)=>{
    const orders = getordersfromfile()
    res.json(orders)
})



app.get('/orders/user/:userid', async (req,res)=>{
    try {
        const userId = req.params.userid
        const userresponse = await axios.get(`http://localhost:3001/users/${userId}`)
        const user =  userresponse.data

        const orders = getordersfromfile()
        const userorders = orders.filter(order => order.userId === parseInt(userId))

        res.json({
            user : user,
            orders : userorders
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching user or orders")
    }
})

app.listen(3002, () => {
    console.log('Order service running on port 3002');
  });

