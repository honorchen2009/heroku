var bcrypt = require('bcrypt')
var User = require('../models/User')

module.exports = (req,res) =>{
    var { username,password } = req.body
    
    
    User.findOne({username: username},function(error,user){        
        if(user){
            bcrypt.compare(password, user.password, (error,same)=>{
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else {
                    return res.redirect('/auth/login')
                }
            })
        }
        else{
            console.log("/auth/login::",user)
            res.redirect('/auth/login')
        }
    })
}