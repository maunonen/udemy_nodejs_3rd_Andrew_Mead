const  fs = require('fs')
const chalk = require('chalk'); 


const getNotes =  () => {
    return 'My Notesc'
}

const readNotes = (title) => {
    debugger
    const listNotes= loadNotes()
    const readNote = listNotes.find((note)=> (note.title === title))
    if (readNote){
        console.log(chalk.green.inverse(readNote.title))
        console.log(readNote.body)
    } else {
        console.log(chalk.red.inverse(title + ' Note not found'))
    }
}

const listNotes = () => {
    const listNotes = loadNotes(); 
    if (listNotes.length !== 0 ){
        console.log(chalk.green.inverse('Yours notes')); 
        listNotes.forEach(element => {
            console.log(element.title); 
        });
    } else {
        console.log(chalk.red.inverse('Notes list is empty '))
    }
}

const removeNotes = (title) => {
    debugger; 
    if (!title){
        console.log(chalk.bgRed('Title is empty ')); 
        return 0; 
    }
    
    const notes = loadNotes()
    const removedNote = notes.filter((note) =>  note.title !== title )

    if (removedNote.length === notes.length ){
        console.log(chalk.bgRed('Nothing to remove')); 
    }else { 
        saveNotes(removedNote)
        console.log(chalk.bgGreen('Note was removed'))
    }

}

const addNotes =  (title , body ) => {

    const notes = loadNotes(); 
    // const duplicateNotes = notes.filter( (note) =>  note.title === title)
    const duplicateNote  = notes.find((note) => note.title === title); 

    if (!duplicateNote){
        notes.push({
            title : title, 
            body : body
        })
        saveNotes( notes)
        console.log(chalk.green.inverse('New notes is added'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
   
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)  
    fs.writeFileSync('notes.json', dataJSoN); 
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
}

module.exports = { getNotes, addNotes, removeNotes, listNotes, readNotes} ; 