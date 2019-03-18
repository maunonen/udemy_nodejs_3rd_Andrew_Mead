const fs = require('fs'); 

const exampleBuffer = fs.readFileSync('1-json.json'); 
const exampleData = exampleBuffer.toString(); 
const exampleObject = JSON.parse(exampleData); 
exampleObject.name = 'Alex'; 
exampleObject.planet = 'Mars'; 

const exampleModifedToString = JSON.stringify(exampleObject); 
const exampleSavedToFile = fs.writeFileSync('1-json.json', exampleModifedToString); 




/* const dataBufer = fs.readFileSync('1-json.json'); 
const dataJSON = dataBufer.toString(); 
const data = JSON.parse(dataJSON); 

console.log(data.title); 
console.log(dataJSON);  */


/* const book = {
    title : 'Ego is the enemy' ,
    author : 'Ryan Holiday'
}; 

const bookJSON = JSON.stringify(book); 
console.log(bookJSON); 

const parsedData = JSON.parse(bookJSON); 
console.log(parsedData.author); 

fs.writeFileSync('1-json.json', bookJSON);  */