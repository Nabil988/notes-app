import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for notes and note input
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  
  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever the notes array changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Add or Edit a note
  const handleNoteSubmit = () => {
    if (editingIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === editingIndex ? newNote : note
      );
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }
    setNewNote('');
  };

  // Edit a note
  const handleEdit = (index) => {
    setNewNote(notes[index]);
    setEditingIndex(index);
  };

  // Delete a note
  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Notes App</h1>
      </nav>

      <div className="main-content">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
          rows="4"
          cols="50"
        ></textarea>

        <button onClick={handleNoteSubmit}>
          {editingIndex !== null ? 'Edit Note' : 'Add Note'}
        </button>

        <div className="notes-list">
          {notes.length === 0 ? (
            <p>No notes added yet.</p>
          ) : (
            notes.map((note, index) => (
              <div key={index} className="note">
                <p>{note}</p>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Made with ❤️ by You</p>
      </footer>
    </div>
  );
}

export default App;
