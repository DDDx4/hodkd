const express = require('express')
const router = require('./router')
const path = require('path')
const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use(express.static(path.join(__dirname,'public')))


app.listen(8080,'localhost',()=>{
    console.log("start sever on port 8080")
})