const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const Task = require('./task')
 

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
        trim : true
    }, 
    email : {
        type : String, 
        unique : true,  
        required : true, 
        trim : true, 
        lowercase : true, 
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }   
    }, 
    age : {
        type : Number, 
        default : 0, 
        validate (value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }, 
    password : {
        type : String , 
        required : true, 
        trim : true, 
        minlength : 6, 
        validate (value) {
            //if (validator.contains(value.toLowerCase(), 'password')){
                if (value.toLowerCase().includes('password')){
                    throw new Error('Password can not contained "password"')
            }
        }
    }, 
    tokens : [{
        token : {
            type : String , 
                required : true
        }
    }]
}) 

userSchema.virtual('tasks', {
    ref : 'Task', 
    localField : '_id', 
    foreignField : 'owner'
})


userSchema.plugin(uniqueValidator)

// statics method are accessible on a model  
userSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({ email})
    if (!user){
        throw new Error( "Unable to login")
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error( "Unable to login")
    }
    return user
}








// in this example we should use this binding, 
// for this reason we use async function not arrrow function 
// methods are accessible on instance model 

userSchema.methods.generateAuthToken = async function(){

    const user = this
    // generate token
    try {
        const token = jwt.sign({ _id : user._id.toString()}, 'token')
        // add token to user model 
        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token 
    } catch (e){
        throw new Error(e)
    }
}

// 
userSchema.methods.toJSON = function(){
    
    const user = this
    // toObject() allow to get raw object with user data and then manipulate with this data
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens

    //console.log(userObject)
    
    return userObject
}

// HASH the pålai text password before saving 
// pre - doing before action 
// post - doing after action 
// we are uising regular function due to the binding 
// next - continune move 
userSchema.pre('save', async function(next){
    // this give ccess to individual user
    const user = this
    
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})

// delete the tasks when user is removed 

userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({
        owner : user._id
    })

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User