var BlogPost = require('../models/BlogPost')

module.exports = async (req,res) =>{
    var blogpost =  await BlogPost.findById(req.params.id).populate('userid')
    res.render('post',{
        blogpost
    })
}