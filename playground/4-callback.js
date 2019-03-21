setTimeout(()=>{
    console.log('Two second are up')
},2000 )

const names = ['Alex', 'Jen', 'Jess']

const shortNames = names.filter((name) => {
    return name.length <= 4 
})

const geocode = (address, callback ) => {
    setTimeout(()=>{
        const data = {
            latitude : 0, 
            longitude : 0 
        }
        callback(data)
    }, 2000)
}
geocode('Helsinki', (data) => {
    console.log(data)
    
})
//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (arg1, arg2, callback) => {
    setTimeout(()=> {
        sum = arg1 + arg2
        callback(sum)
    }, 2000)
    
    //console.log(sum) // Should print: 5
}

add(1, 4 , (sum) => {
    console.log(sum)
})

const doWorkCallback  = (callback) => {
    setTimeout(() =>{
        //callback('This is my error', undefined)
        callback(undefined, [1,4,7])
    }, 3000)
}

doWorkCallback((error, result) => {
    if (error){
        return console.log(error)
    }
    console.log(result)
} ) 