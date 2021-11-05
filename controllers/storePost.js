var BlogPost = require('../models/BlogPost')
var path = require('path')

module.exports = async (req,res) =>{    
    let image = req.files.image
    image.mv(path.resolve(__dirname,'..','public/img',image.name),
        async (error)=>{
            await BlogPost.create({
                ...req.body,
                image:'/img/' + image.name,
                userid: req.session.userId
            })
            res.redirect('/')
        })

}