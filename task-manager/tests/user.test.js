const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db')


beforeEach(setupDatabase)

/* afterEach(() => {
    console.log('afterEach')
}) */

test('Should signup a new user', async() => {
    const responce = await request(app).post('/users').send({
        name : 'santari', 
        email : 'santari33@gmail.com', 
        password : 'santari111'
    }).expect(201)


    // Assertion that database was changed correctly 
    const user = await User.findById(responce.body.user._id)
    //console.log(user)
    expect(user).not.toBeNull()

    // Assertion about the responce body  

    //console.log(user.tokens[0].token)
    expect(responce.body).toMatchObject({
        user : {
            name : 'santari'
        }  
        //token : user.tokens[0].token
    })
}) 

test('Should logging existing user', async () => {
    const responce = await request(app).post('/users/login').send({
        email : userOne.email, 
        password : userOne.password 
    }).expect(200)

    const dbUser = await User.findById(responce.body.user._id)
    expect(responce.body.token).toBe(dbUser.tokens[1].token) 

})

test('Should not login nonexisting user', async() => {
    await request(app).post('/users/login').send({
        email : 'svwvwvwevwvw', 
        password : 'vvfjnwabvrwibwrpi'
    }).expect(400)
})

test('Should get profile for user', async ()=> {
    //console.log(userOne.tokens[0])
    await request(app)
                .get('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200)
})

test('Should not get profile for unathenticated user', async () => {
    await request(app)
                .get('/users/me')
                // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
                .delete('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200)

    const deletedUser = await User.findById(userOneId)
    expect(deletedUser).toBeNull()
})


test('Should not delete account for unauthenticated user ', async () => {
    await request(app)
                .delete('/users/me') 
                .send()
                .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
            .post('/users/me/avatar')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .attach('avatar', 'tests/fixtures/profile-pic.jpg')
            .expect(200)

    const user = await User.findById(userOneId)

    // In JS to object is not equal even if they have the same property {} === {} 
    //expect({}).toBe()
    expect( user.avatar ).toEqual(expect.any(Buffer))
})

// chalenge
test('Should update valid user fileds', async () => {
    await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({ name : 'alex'})
            expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('alex')
})

test('Should not update invalid user field', async () => {
    await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({ location : 'NY'})
            .expect(400)
})