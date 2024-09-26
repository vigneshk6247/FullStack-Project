const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3091
const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/crud')
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    username:String,
    password:String
})
const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
app.post('/post', async (req,res)=>{
    const { username, password } = req.body;
    const user = new Users({
        username,
        password
    });
    await user.save();
    console.log(user);
    res.send("Form submission successful");
});

app.listen(port,()=>{
    console.log("server is running")
})