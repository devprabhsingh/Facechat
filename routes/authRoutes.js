const router = require('express').Router();
const User = require('../modals/User');


// main route - authentication route 
router.get('/',(req,res)=>{
    res.render('auth')
})

// registering new user
router.post('/register',async(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        dob:req.body.dob
    })

    try{
       var savedUser =await user.save();
    }catch(err){
        if(err) console.log(err);
    }
    
    res.send(savedUser)
})

// login for existing user
router.post('/login',async(req,res)=>{

    await User.findOne({email:req.body.email},(err,user)=>{

        // verfying email id
        if(err) return res.send({msg:"email id does not exists"})

        //verfying password
        if(user.password!=req.body.password) return res.send({msg:"password is wrong"})
        else return res.send({_id:user._id,msg:"verified"});
    })
})

module.exports = router;