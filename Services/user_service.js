const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())


const userspath = path.join(__dirname,"users.json")

const getusersfromfile = () =>{
    const data = fs.readFileSync(userspath,'utf-8')
    return JSON.parse(data)
}

app.get('/users',(req,res)=>{
    const users = getusersfromfile()
    res.json(users)
})

app.get('/users/:id',(req,res)=>{
    const users = getusersfromfile()
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).send("user not found")
    res.json(user)
})

app.post('/users',(req,res)=>{
    const users = getusersfromfile()
    const newuser = {
        id : users.length + 1,
        name: req.body.name
    }

    users.push(newuser)

    fs.writeFileSync(userspath, JSON.stringify(users,null,2), 'utf-8')

    res.status(201).json(newuser)
})

app.listen(3001, ()=>{
    console.log("user service running on port 3001");
})

