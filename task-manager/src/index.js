const express = require('express')

const app = express()
const port = process.env.PORT || 3000

require('./db/mongoose')

const userRouter = require('./routers/user') 
const taskRouter = require('./routers/task')




/* app.use((req, res, next) => {  */
/*     if(req.method === 'GET'){
        res.send('GET request are disabled')
    } else {
        next()
    }
}) */

/* app.use( (req, res, next) => {
    res.status(503).send('Site is updating now')
}) */

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, ()=> { 
    console.log('Server is up on port ', port)
})

const Task = require('./models/task')
const User = require('./models/user')

//const multer = require('multer')

// usnig multer to uppload files
/* const upload = multer({
    dest : 'images', 
    limits : {
        // in bytes 
        fileSize : 1000000,    
    }, 
    fileFilter (req, file, cb) {
         //if (!file.originalname.endsWith('.pdf')){
            if (!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload Word document'))
         }
         cb(undefined, true)
        //cb(new Error('File must be PDF'))
        //cb(undefined, true)
        //cb(undefined, false) 
    }
}) 
 */
/* const errorMiddleware =  (req, rec) =>  {
    throw new Error('From my middleware')
} */
// Handle error from multer 
/*  app.post('/upload', upload.single('upload'),  (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({
        error : error.message
    })
}) */

/* 
const main = async () => {

    const user = await User.findById('5ca1e62a0572bf3e93632563')
    await user.populate('tasks').execPopulate('')
    console.log(user.tasks)

    /*     const task = await Task.findById('5ca1e733b97ebb3edf77d357')
    await task.populate('owner').execPopulate()
    console.log(task.owner) */
/* }  */

/* main()  */ 


/* const jwt = require('jsonwebtoken')


const myFunction = async () => {


const pet = {
    name : 'Hal'
}

pet.toJSON = function ()  {
    console.log(this)
    return {}
} */


/* console.log(JSON.stringify(pet)) */


    //const password = 'Red12345!'
/* 
    const token = jwt.sign({ _id : 'abc123' }, 'token', { expiresIn : '7 days'})


    console.log(token)

    try {
        const data = await jwt.verify(token , 'token')
        console.log(data)
    } catch (e){
        console.log(e)
    } */
    
    

 /*     const hashedPass = await bcrypt.hash(password, 8)
        console.log(password)
        console.log(hashedPass)
        const isMatch = await bcrypt.compare('Red12345!', hashedPass)
        console.log(isMatch) */
/* }
myFunction() */