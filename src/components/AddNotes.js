import React, { useState, useContext } from 'react';
import { NoteContext } from '../context/notes/noteContext';

const AddNote = () => {
  const [noteData, setNoteData] = useState({
    title: '',
    description: '',
    tag: '',
  });

  const [isAddingNote, setIsAddingNote] = useState(false);

  const { addNote } = useContext(NoteContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prevNoteData) => ({ ...prevNoteData, [name]: value }));
  };

  const handleAddNoteClick = async () => {
    console.log('handleAddNoteClick called');
    try {
      if (!noteData.title.trim() || !noteData.description.trim()) {
        alert('Title and Description cannot be empty');
        return;
      }

      setIsAddingNote(true);

      const authToken = localStorage.getItem('token');

      const response = await fetch('http://localhost/api/notes/addnote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the server responds with the added note data, you might want to update your local state accordingly
      const addedNote = await response.json();
      addNote(addedNote);

      // Reset the form after successfully adding a note
      setNoteData({
        title: '',
        description: '',
        tag: '',
      });

    } catch (error) {
      console.error('Error adding note:', error.message);
      // Handle error, show an alert, or redirect as needed
    } finally {
      // Re-enable the button after the operation is completed
      setIsAddingNote(false);
    }
  };

  return (
    <div className="container m-3 mt-9">
      <h2>Add a New Note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={noteData.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={noteData.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={noteData.tag}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddNoteClick}
        disabled={isAddingNote}
      >
        {isAddingNote ? 'Adding Note...' : 'Add Note'}
      </button>
    </div>
  );
};

export default AddNote;
