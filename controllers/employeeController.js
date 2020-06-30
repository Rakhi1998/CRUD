const express=require('express')
const mongoose=require('mongoose')
const Employee=mongoose.model('Employee')

const router = express.Router()

router.get('/',(req,res) => {
    res.render('employee/addOrEdit.hbs',{
        viewTitle:"Insert Employee"
    })
})
//handle the post request
router.post('/',(req,res) => {
    //check for type of requests
    if(req.body._id == ""){
        insertRecord(req,res)
    }else{
        updateRecord(req,res)
    }
})
function insertRecord(req,res){
    var employee=new Employee();

    employee.fullname=req.body.fullname;

    employee.email= req.body.email;

    employee.mobile = req.body.mobile;

    employee.city= req.body.city;

    //checking for validations
    if(employee.fullname == "" || employee.email == "" ||employee.mobile == "" || employee.city == ""){
        res.render('employee/addOrEdit',({
            viewTitle:'Insert Employee',
            error:'Enter All the details',
            employee:req.body
        }))
        return
    }

    employee.save((err,doc) => {
        if(!err){
            res.redirect('employee/list')
        }else{
            if(err.name == "ValidationError")
            {
                handleValidationError(err,req.body)
                res.render('employee/addOrEdit',({
                    viewTitle: "Insert Emplpoyee",
                    employee:req.body
                }))
            }
            console.log('An error occured in inserting records'+err)
        }
    })
}

router.get('/list',(req,res) => {
    Employee.find((err,doc) => {
        if(!err){
            res.render('employee/list',{
                list:doc
            })
        }
    })
})

router.get('./:id',(req,res) => {
    Employee.findById(req.params.id,(err,doc) => {
        if(!err){
            res.render('employee/addOrEdit',({
                viewTitle:'Update Employee',
                employee:doc
            }))
        }
    })
})

router.get('/delete/:id',(req,res) => {
    Employee.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect('/employee/list')
        }else{
            console.log('Error Occured : '+err)
        }
    })
})

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path)
        {
            case 'fullname':
                body['fullNameError'] = err.errors[field].message
                break
            case 'email':
                body['emailError'] = err.errors[field].message
                break
            default:
                break
        }
    }
}
router.get('/:id',(req,res) => {
    Employee.findById(req.params.id,(err,doc) => {
        if(!err){
            res.render('employee/addOrEdit',({
                viewTitle:'Update Employee',
                employee:doc
            }))
        }
    })
})
function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc) => {
        if(!err){
            res.redirect('employee/list')
        }else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body)
                res.render('employee/addOrEdit',({
                    viewTitle:"Update Employee",
                    employee:re.body
                }))
            }else{
                console.log('Error Occured : '+err)
            }
        }
    })
}

module.exports = router
