const doWorkPromise = new Promise((resolve, reject) => {
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
})