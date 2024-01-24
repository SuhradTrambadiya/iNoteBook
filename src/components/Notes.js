import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/notes/noteContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Notes = () => {
  const { notes, fetchDataFromApi, deleteNote, updateNote } = useContext(NoteContext);
  const [editNoteData, setEditNoteData] = useState({
    id: '',
    title: '',
    description: '',
    tag: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditNoteClick = (note) => {
    // Set the edit note data in the state
    setEditNoteData({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
    // Show the edit modal
    setShowEditModal(true);
  };

  const handleUpdateNoteClick = async () => {
    try {
      // Make an API request to update the note
      await updateNote(editNoteData);

      // Clear the edit note data after successful update
      setEditNoteData({
        id: '',
        title: '',
        description: '',
        tag: '',
      });

      // Hide the edit modal
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating note:', error.message);
      // Handle error, show an alert, or redirect as needed
    }
  };

  const handleCloseEditModal = () => {
    // Clear the edit note data and hide the edit modal
    setEditNoteData({ id: '', title: '', description: '', tag: '' });
    setShowEditModal(false);
  };

  return (
    <div className="container mt-3">
      <h2>All Notes</h2>
      <div className="row ">
        {notes.map((note) => (
          <div key={note._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text ">{note.description}</p>
                {note.tag && (
                  <p className="card-text">
                    <small className="text-muted">Tag: {note.tag}</small>
                  </p>
                )}
                {/* Edit button */}
                <i
                  className="fa-solid fa-pen-to-square mx-2 edit-icon"
                  onClick={() => handleEditNoteClick(note)}
                  style={{ cursor: 'pointer' }}
                ></i>
                {/* Delete button */}
                <i
                  className="fa-solid fa-trash-can mx-1 delete-icon"
                  onClick={() => deleteNote(note._id)}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing Note */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="editTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="editTitle"
              name="title"
              value={editNoteData.title}
              onChange={(e) =>
                setEditNoteData({ ...editNoteData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="editDescription"
              name="description"
              value={editNoteData.description}
              onChange={(e) =>
                setEditNoteData({ ...editNoteData, [e.target.name]: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="editTag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="editTag"
              name="tag"
              value={editNoteData.tag}
              onChange={(e) =>
                setEditNoteData({ ...editNoteData, [e.target.name]: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateNoteClick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Notes;
