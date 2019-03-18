const name = 'Alex'
const age = 36

const user = {
    name, 
    age, 
    location : 'Vantaa'
    /* name : name , 
    age : age,  
    location : 'Vantaa' */
}

const product = {
    label : 'Red notebook', 
    price : 3, 
    stock : 201, 
    salePrice : undefined, 
    props : {
        color : 'red', 
        size : 'm',
        arr : [2,4,4] 
    }  
}

const {props : {color : productColor }, props : {arr : [two] }} = product

console.log(productColor)
console.log(two)
//console.log(color + '  ' + arr)

const {price , label : productLabel, stock , salePrice = 0} = product
console.log(price)
//console.log(label)
console.log(user)
console.log(productLabel)
console.log(salePrice)

const  transaction = (type , {label, stock}) => {

    console.log(label)
    console.log(stock)
}

transaction('order', product)