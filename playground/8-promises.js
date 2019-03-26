
const add = (a, b) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// promise chaining

add(1,1).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
     console.log(sum2)   
}).catch(() => {
    console.log(e)
})

// Multiply Promises 
/* add( 2 , 3 ).then((sum) => {

    console.log(sum)

    add(sum, 5).then((sum2) => {
        console.log(sum2)
    }).catch((e) => {
        console.log(e)
    })

}).catch((e) => {
    console.log(e)
}) */

/* const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([7, 4, 1])

        reject('Things went wrong')
        resolve([2,4,4,])
    }, 2000)
})

doWorkPromise.then((result) => {

    console.log('Succes', result)

}).catch((error) =>{
    console.log('Erro', error)
}) */