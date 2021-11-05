const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://honorchen2009:honor124598@cluster0.pr4tg.mongodb.net/test',{useNewUrlParser: true})

const app = new express()
const ejs = require('ejs')
const { resourceUsage } = require('process')
const flash = require('connect-flash');

const fileUpload = require('express-fileupload')
const expressSession = require('express-session');


app.set('view engine','ejs')

const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newPostController = require('./controllers/newPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const validateMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.use('/posts/store',validateMiddleWare)
app.use(flash())
app.use(expressSession({
    secret:'keyboard cat'
}))

global.loggedIn = null;

app.use("*", (req, res, next) =>{
    loggedIn = req.session.userId;
    next()
})

let port = process.env.PORT;
if(port == null || port == ""){
    port = 4000;
}
app.listen(port);

app.get('/',homeController)
app.get('/post/:id',getPostController)

app.get('/posts/new',authMiddleware,newPostController)

app.post('/posts/store',authMiddleware,storePostController)

app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)

app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)

app.get('/auth/logout',logoutController)

app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)

app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)

app.use((req,res)=>res.render('notfound'));