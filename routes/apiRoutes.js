const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


module.exports = (app) => {
        app.get('/api/notes', (req, res) => {
            fs.readFile("./db/db.json", "utf8", (err, data) => {
                if (err) throw err;
                console.log(data)
                return res.json(JSON.parse(data)) //turns it into a JS object aka array
            })
        });
        app.post('/api/notes', (req, res) => {
            let newNote = req.body
            fs.readFile("./db/db.json", "utf8", (err, data) => {
                if (err) throw err;
                console.log(newNote)
                let notes = JSON.parse(data) //now array
                newNote.id = uuid.v4() //object, how to add properties to objects newNote["id"]
                notes.push(newNote) //Array -> object
                fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                    return res.json(newNote)
                })
            })
        });

        app.delete('/api/notes/:id', (req, res, ) => {
            fs.readFile("./db/db.json", "utf8", (err, data) => {
                console.log(req.params.id)
                var jsonNotes = JSON.parse(data)
                jsonNotes = jsonNotes.filter(note => {
                    note.id !== req.params.id
                })
                res.json(jsonNotes)
                fs.writeFile("./db/db.json", JSON.stringify(jsonNotes), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                })
            })
        })
                



            };