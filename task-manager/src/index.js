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

const jwt = require('jsonwebtoken')


const myFunction = async () => {


const pet = {
    name : 'Hal'
}

pet.toJSON = function ()  {
    console.log(this)
    return {}
}


console.log(JSON.stringify(pet))


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
}
myFunction()