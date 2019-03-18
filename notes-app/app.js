/* const validator = require('validator');  */
const notes = require('./notes'); 
const yargs = require('yargs'); 
const chalk = require('chalk'); 

//const command = process.argv[2]; 

// add, remove, read, list 

yargs.version('1.2.0'); 
yargs.command({
    command : 'add', 
    describe : 'Add a new note', 
    builder : {
        title : {
            describe : 'Note title', 
            demandOption : true, 
            type : 'string'
        }, 
        body : {
            describe : 'Body title', 
            demandOption  : true, 
            type : 'string'
        }
    }, 
    handler(argv){
        notes.addNotes(argv.title, argv.body); 
    }
}); 

yargs.command({
    command : 'remove', 
    describe : 'Remove a note ', 
    builder : {
        title : {
            describe : 'Removed title', 
            demandOption : true, 
            type : 'string'
        }
    }, 
    handler (argv){
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command : 'list', 
    describe : 'list a note ', 
    handler (){
        notes.listNotes()
    }
})

yargs.command({
    command :  'read', 
    describe : 'read a note', 
    builder : {
        title : {
            describe : 'searched note', 
            demandOption : true, 
            type : 'string'
        }
    },
    handler(argv){
       notes.readNotes(argv.title)
    } 
})

yargs.parse(); 

//console.log(yargs.argv); 

//console.log(process.argv); 
/* if (command === 'add'){
    console.log('Adding note'); 
} else if (command === 'remove'){
    console.log('Removing note'); 
}
 */ 

/* const msg = notes(); 

console.log(chalk.green.inverse.bold('Success'));
console.log(chalk.blue.inverse.bold('Error')); */



/* 
console.log(msg); 
console.log(validator.isEmail('santarifves.rd')); 
console.log(validator.isURL('vdvrd'));  */


/* const add = require('./utils'); 
const sum = add(4 , -2 ); 
console.log(sum); 

//const fs = require('fs'); 
// fs.writeFileSync('notes.txt', 'Hello world '); 
//fs.appendFileSync('notes.txt', 'data to append');
   */