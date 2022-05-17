const express = require('express');
const path = require('path');
const fs = require('fs');


// port for server and for 3001 localhost server
const PORT = process.env.PORT || 3001;

// const app for express calling
const app = express();

// request data for notes
const { notes } = require('./db/db.json');
const { type } = require('os');

app.use(express.urlencoded ( {extended: true}));
app.use(express.json());
app.use(express.static('public'));

function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({
            notes: notesArray}, null, 2)
    );
    return note;
};

function validateNote (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    } 
    // if (!note.text || typeof note.text !== "string") {
    //     return false; 
    // }
    else {
        return true;}
};

// get route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (rew, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('Missing title or note.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

//to notes.html
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// listen to servers
app.listen(PORT, () => {
    console.log(`${PORT} is the current server`)
});



//delete notes
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note;
    notes.map((element, index) => {
        if (element.id == id) {
            note = element;  // might have to get rid of ;
            notes.splice(index, 1); // might have to get rid of ;
            return res.json(note);
        }
    })
});
