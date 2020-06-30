const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/EmployeeDb'

//connect method of mongoose
mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){
        console.log('Database Connection Successful with MongoDB')
    }else{
        console.log('An Error Occured : ',err)
    }
})

require('./employee.model')