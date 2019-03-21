/* const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient 
const ObjectID = mongodb.ObjectID */

// the same as up above but using destructuring 

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-mananger'
 
/* const id = new ObjectID()
console.log(id.id)
console.log(id.id.length)
console.log(id.getTimestamp())
console.log(id.toHexString().length) */

MongoClient.connect(connectionURL, {
    useNewUrlParser : true 
} , (error, client) => {
    if (error){
        return console.log('Unable to connect to database', error)
    } 
    console.log('Connected correctly')
    
    const db = client.db(databaseName)


    db.collection('users').deleteMany({
        age : 37 
    }).then(() => {
        console.log(result)
    }).catch(() => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        description : "some 1"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    const updatePromise = db.collection('users').updateOne({
        _id : new ObjectID('5c935fde4de82e415300bd53')
    }, {
        $inc : {
            age : 1
        }
    })

    const updateMany = db.collection('tasks').updateMany({
        completed : false
    }, {
        $set : {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


    
    updatePromise.then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log('Error', error)
    })

   /*  db.collection('users').find({
        age : 37
    }).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').find({
        age : 37
    }).count((error, count) => {
        console.log(count)
    })

    db.collection('tasks').findOne({
        _id : new ObjectID('5c9363adcb352941b5f53ee7')
    }, (error, task)=> {
        if (error){
            return console.log(error)
        }
        console.log(task)
    })

    db.collection('tasks').find({
        completed : false
    }).toArray((error, task) => {
        if (error){
            return console.log('Unable to get the tasks')
        }
        console.log(task)
    })

    
    db.collection('users').findOne({
        _id : new ObjectID('5c935d8ce5269f412ef1fc17')
        //_id : '5c935d8ce5269f412ef1fc17'
    }, (error, user) => {
        if (error){
            return console.log('Unable to fetch')
        }
        console.log(user)
    }) */
/*    db.collection('users').insertOne({
        _id : id, 
        name : 'Vicram', 
        age : 37
    }, (error, result) => {
        if (error){
            return console.log('Unable to insert user')
        }   

        // OPS return an array
        //console.log(result)
        console.log(result.ops)
    })  */
/*     db.collection('users').insertMany([
        {
            name : 'Jane', 
            age : 28
        }, {
            name : 'Jari', 
            age : 12
        }
    ], (error, result) => {
        if (error){
            return console.log('Unable to insert Documents', error)
        }
        console.log(result.ops)

    }) */

   /*  db.collection('tasks').insertMany([
        {
            description : 'some 1', 
            completed : true 
        },
        {
            description : 'some 2', 
            completed : false 
        },{
            description : 'some 3', 
            completed : false 
        }
    ], (error, result)=> {
        if (error){
            return console.log('Unable to insert DOcuments', error)
        }
        console.log(result.ops)
    }) */
} )