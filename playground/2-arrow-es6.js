
const event  = {
    name : 'Alex', 
    guestList : ['Janr', 'Mike', 'Alex'], 
    printGuestList() {
        console.log('Guset List for '  + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + 'is attednding ' + this.name); 
        })
    }
}

event.printGuestList(); 
/* const square = x => x * x; */

/* const square = (x) => {
    return x * x 
} */

/* const square = function (x){
    return x * x
} */

//console.log(square(3)); 