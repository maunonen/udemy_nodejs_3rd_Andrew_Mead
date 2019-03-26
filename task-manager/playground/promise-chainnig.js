require('../src/db/mongoose')
const User = require('../src/models/user')

//5c93f3674952a8539ac4396f
/* 
User.findByIdAndUpdate('5c98df65b5eb2b65f9e4ac36', {age : 1}).then((user) => {
    console.log(user) 
    return User.countDocuments({age : 1})   
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
}) */

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id , { age })
    const count = await User.countDocuments({ age })

    return count 
}

updateAgeAndCount('5c98df65b5eb2b65f9e4ac36', 2).then((count) => {
    console.log(count)
}).catch(() => {
    console.log(e)
})