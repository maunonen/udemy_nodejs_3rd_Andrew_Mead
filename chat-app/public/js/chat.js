const socket = io()

// getting data from server on client side 

socket.on('messageServer', (message) => {
    console.log(message)
})

socket.on('message', (mes) => {
    console.log(mes)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    // e.target - links to the form. Elements - all elements of the forms
    // message - the name of input field 
    const message = e.target.elements.message.value
    // callback aftre message allow us to send acknowledgemnet message to the client that message was sent 
    socket.emit('messageCLient', message, (error) =>{
        if (error){
            return console.log(error)
        }
        console.log('Message delivered')
    })  
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolacation is not supported by your browser')
    } 
    socket.emit('sendLocation', {
        latitude : 60, 
        longitude : 60 
        //latitude : position.coords.latitude, 
        //longitude : position.coords.longitude 
    }, ()=> {
        console.log('Location shared')
    })
    //navigator.geolocation.getCurrentPosition(getCoor, errorCoor, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    navigator.geolocation.getCurrentPosition((position) => { 
        console.log('Position is ',   position)
        socket.emit({
            latitude : 60, 
            longitude : 60 
        //latitude : position.coords.latitude, 
        //longitude : position.coords.longitude 
        })
    }), 
    () => {
        console.log()
    },  {maximumAge:60000, timeout:5000, enableHighAccuracy:true}
})

/* socket.on('countUpdated', (count) => {
    console.log('THe count has been updated', count )
})
 */


/* document.querySelector('#increment').addEventListener('click', ()=> {
    console.log('Clicked')
    // send data back to the server 
    socket.emit('increment')
}) */

