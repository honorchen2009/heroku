var BlogPost = require('../models/BlogPost')

module.exports = async (req,res) =>{
    var blogposts = await BlogPost.find({}).populate('userid')    
    console.log(req.session)
    res.render('notfound',{
        blogposts
    })
}