require ('../src/db/mongoose')

const Task = require('../src/models/task')

/* Task.findByIdAndDelete('5c93ea8d8340c051cf7172ba').then((user)=> {
    console.log(user)
    return Task.countDocuments({ completed : false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
}) */


const deleteTaskAndCount = async (id) => {
    const user = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed : false})
    return count
}
deleteTaskAndCount('5c99f04bbb057f69be173af533').then((count) => {
    console.log('Count ', count)
}).catch((e) => {   
    console.log(e)
})