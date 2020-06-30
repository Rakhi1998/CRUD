require('./models/db')
const express=require('express')

const bodyParser=require('body-parser')

const path=require('path')
const expressHandlebars=require('express-handlebars')

const employeeController=require('./controllers/employeeController')

var app=express()

//configuring middleware
app.use(bodyParser.urlencoded({
    extended:true
}))
//will convert all requested data into json format
app.use(bodyParser.json())

//configuring the view of application
app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',expressHandlebars({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname+'/views/layouts'
}))
//successfully configured view engine
app.set('view engine','hbs')

//configuring route for home
app.get('/',(req,res) => {
    res.send('Hello World')
})

app.listen(5000,() => {
    console.log('Server Started(Port No:5000)')
})

app.use('/employee',employeeController)