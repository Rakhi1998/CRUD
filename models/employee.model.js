const mongoose=require('mongoose')
const validator=require('email-validator')
//Defining Schema 
var employeeSchema= new mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    }
})
employeeSchema.path('email').validate((val) => {
    return validator.validate(val)
},'Invalid Email')

module.exports=mongoose.model('Employee',employeeSchema)