const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')

router.get('/test', (req, res) => {
    res.send('From a new file')
})



router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredential(req.body.email, req.body.password)
        const token = await user.generateAuthToken() 
        
        res.status(200).send({ user, token})
    } catch (error){
        //console.log(error)
        res.status(400).send(error.message || error)
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send('Logout successfully')
    } catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send('Logout from all successfully')
    } catch (e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    // this fetch all recrds from database  

    res.send(req.user)
  /*   User.find({}).then((users)=> {
        res.status(200).send(users)
    }).catch((e) => {
        res.status(500).send()
    }) */
})

/* router.get('/users/:id',  async (req,res) => {
    
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e){
        res.status(500).send(e)
    } */

/*     User.findById(_id).then((user) => { 
        if (!user){
            return res.status(404).send()
        } 
            res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
     */
    //console.log(req.params)
/* }) */

router.post('/users', async (req, res)=> {

    const user = new User(req.body)

    try {
        await  user.save()
        const token = await user.generateAuthToken()
        //console.log(user)
        res.status(201).send({user, token })
    } catch (e){
        res.status(400).send(e)
    }
/*     user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {

        res.status(400).send(e)
    }) */
})

router.patch('/users/me',  auth, async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdatesArray = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) =>  allowedUpdatesArray.includes(update))

    if (!isValidOperation){
        return res.status(400).send({ error : 'Invalid updates'})
    }

    try {

        req.user
        //const user = await User.findById(req.user._id)
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true })
  
        res.send(req.user)
    } catch (e){
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    
    try {
        /* const user = await User.findByIdAndDelete(req.user._id) */
     /*    if (!user){
            return res.status(404).send()
        } */

        await req.user.remove()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
    
} )

const upload = multer({
    //dest : 'avatars', 
    limits : {
        fileSize : 1000000,
    }, 
    fileFilter (req, file, cb) {
           if (!file.originalname.match(/\.(jpg|jpeg | png)$/)){
           return cb(new Error('Please upload Image (.jpeg, .jpg, png)'))
        }
        cb(undefined, true) 
   }
})

/* const errorMiddleware =  (req, rec) =>  {
    throw new Error('From my middleware ')
} */
// modify post request to handle errors 

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    

    const buffer = await sharp(req.file.buffer)
                                .resize({ width : 250, heigth : 250})
                                .png()                        
                                .toBuffer()
    req.user.avatar = buffer                            
    await req.user.save()
    res.send()
} , (error, req, res, next) => {
    res.status(400).send({
        error : error.message
    })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    try {
        await req.user.save()
        res.status(200).send()
    } catch (e){
        res.status(500).send({
            error : e.message
        })
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {   
        const user = await User.findById(req.params.id)
        if ( !user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router 