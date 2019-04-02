const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')


// GET /tasks?completed=true
// GET /tasks?limit=2&skip=2
// GET /tasks?sortBy=createdAt_desc

router.get('/tasks', auth, async (req, res) => {

    const match = {}
    const sort ={}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        
        // creating sort object from query request 
        /* sort :{
            createdAt : -1 
        } */
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        //const tasks =  await Task.find({})
        // const tasks = await Task.find({ owner : req.user._id})

        // populate us with 'tasks' array from ref instance in the 
        //await req.user.populate('tasks').execPopulate('')
        await req.user.populate({
            path : 'tasks', 
            match, 
            options : {
                limit : parseInt(req.query.limit), 
                skip : parseInt(req.query.skip), 
                sort
             /*    sort :{
                    //createdAt : -1 
                    completed : -1
                } */
            }
        }).execPopulate('')
        res.status(200).send(req.user.tasks)
    } catch (e){
        res.status(500).send(e)
    }
/*     Task.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((e) => {
        res.status(500).send(e)
    }) */
})

router.get('/tasks/:id', auth,  async (req,res) => {
    
    
    const _id = req.params.id


    try {
        //const task = await Task.findById(_id)

        const task = await Task.findOne({ _id, owner : req.user._id})

        if (!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch (e){
        res.status(500).send(e)
    }

/*     Task.findById(_id).then((task) => {
        if (!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    }) */
})

router.post('/tasks', auth, async (req, res) => {
    
    //const task = new Task (req.body)
    const task =  new Task({
        ...req.body, 
        owner : req.user._id
    })

    try {
        await task.save()    
        res.status(201).send(task)
    }catch (e){
        res.status(400).send(e) 
    }

/*     task.save().then(()=> {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    }) */
})




router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    if(!updates.length ){
        return res.status(400).send({error : 'Nothing to update'})
    }
    const allowedUpdatesArray = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdatesArray.includes(update))

    if (!isValidOperation){
        return res.status(400).send({ error : 'Invalid updates'})
    }
    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true} )

        //const task = await Task.findById(req.params.id)

        const task = await Task.findOne({
            _id : req.params.id, 
            owner : req.user._id
        })

        if (!task){
            res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)

    } catch(e) {
        res.status(400).send(e)
    }
})



router.delete('/tasks/:id', auth,  async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({
            _id : req.params.id, 
            owner : req.user._id
        })
        if (!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch (e){
        res.status(500).send(e)
    }
})

module.exports = router