const util = require("util");
const fs = require("fs");
const uuid = require("uuid").v1;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    createNote(note) {
        const { title, text } = note

        if (!title || !text) {
            throw new Error("Title and text must have input!")
        }

        const newNote = { title, text, id: uuid() }

        return this.fetchNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }

    fetchNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
    
    deleteNote(id) {
        return this.fetchNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(keptNotes => this.write(keptNotes))
    }
}

module.exports = new Storage();
