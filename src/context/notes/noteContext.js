// NoteContext.js
import React, { createContext, useState, useEffect } from 'react';
import isAuthenticated from '../../components/AuthHelper'; // Adjust the import path accordingly

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [authToken, setAuthToken] = useState('');

  const getAuthTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
  };

  const fetchDataFromApi = async () => {
    try {
      const storedToken = getAuthTokenFromLocalStorage();

      if (isAuthenticated() && storedToken) {
        setAuthToken(storedToken);

        const response = await fetch('http://localhost/api/notes/fetchallnotes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': storedToken,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch notes. HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const addNote = async (newNote) => {
    try {
      const storedToken = getAuthTokenFromLocalStorage();

      if (isAuthenticated() && storedToken) {
        const response = await fetch('http://localhost/api/notes/addnote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': storedToken,
          },
          body: JSON.stringify(newNote),
        });

        if (!response.ok) {
          throw new Error(`Failed to add a note. HTTP error! Status: ${response.status}`);
        }

        // Directly update the state by appending the new note
        setNotes((prevNotes) => [...prevNotes, newNote]);
      }
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const storedToken = getAuthTokenFromLocalStorage();

      if (isAuthenticated() && storedToken) {
        const response = await fetch(`http://localhost/api/notes/deletenote/${noteId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': storedToken,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to delete a note. HTTP error! Status: ${response.status}`);
        }

        // Directly update the state by removing the deleted note
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      }
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const storedToken = getAuthTokenFromLocalStorage();

      if (isAuthenticated() && storedToken) {
        const response = await fetch(`http://localhost/api/notes/updatenote/${updatedNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': storedToken,
          },
          body: JSON.stringify({
            title: updatedNote.title,
            description: updatedNote.description,
            tag: updatedNote.tag,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update a note. HTTP error! Status: ${response.status}`);
        }

        // Directly update the state with the updated note
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === updatedNote.id ? { ...note, ...updatedNote } : note
          )
        );
      }
    } catch (error) {
      console.error('Error updating note:', error.message);
      throw error; // Propagate the error for handling in the component
    }
  };

  useEffect(() => {
    fetchDataFromApi();
    return () => {
      // Cleanup or perform any necessary actions on component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, fetchDataFromApi }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteProvider, NoteContext };
