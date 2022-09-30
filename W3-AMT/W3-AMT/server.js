const express = require ("express");
const app = express()

const db = require('./config/database')


app.get('/',(req,res)=>{
    res.send('amir')
})


const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server in listen on ${PORT}`);
})
