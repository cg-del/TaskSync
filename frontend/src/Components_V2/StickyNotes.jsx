import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from '../UserContext'; // Import UserContext for user details

export default function StickyNotes() {
  const { user } = useUser();  // Getting user data from context
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Fetch sticky notes only for the logged-in user
  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/stickynote/getStickynotesByUser?userId=${user.userId}`);
          console.log("Fetched Notes:", response.data);
          setNotes(response.data);
        } catch (error) {
          console.error('Error fetching sticky notes:', error.response?.data || error.message);
        }
      };

      fetchNotes();
    }
  }, [user]); // Re-fetch notes whenever the user changes

  const handleChangeNoteContent = (e) => {
    setNewNoteContent(e.target.value);
  };

  const handleNoteOperation = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const noteData = {
      content: newNoteContent,
      user: { email: user.email },
      editable: true,
    };

    try {
      if (editingNoteId) {
        // Update existing note
        await axios.put(`http://localhost:8080/api/stickynote/putStickynoteDetails?id=${editingNoteId}`, noteData);
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.noteId === editingNoteId ? { ...note, content: newNoteContent } : note))
        );
        resetForm();
      } else {
        // Add new note
        const response = await axios.post('http://localhost:8080/api/stickynote/postStickynote', noteData);
        setNotes((prevNotes) => [...prevNotes, response.data]);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding/updating note:', error.response?.data || error.message);
    }
  };

  const handleEdit = (note) => {
    setNewNoteContent(note.content);
    setEditingNoteId(note.noteId); // Set the ID of the note being edited
  };

  const resetForm = () => {
    setNewNoteContent('');
    setEditingNoteId(null);
  };

  const handleDelete = async (noteId) => {
    if (!noteId) {
      console.error("Note ID is undefined, cannot delete.");
      return;
    }
  
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/stickynote/deleteStickynoteDetails/${noteId}`);
        alert(response.data);
        setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));
      } catch (error) {
        console.error('Error deleting note:', error.response?.data || error.message);
        alert('Error deleting note: ' + (error.response?.data || error.message));
      }
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, marginBottom: 2 }}>
        <textarea
          placeholder="New Note..."
          value={newNoteContent}
          onChange={handleChangeNoteContent}
          style={{ 
            width: "190px",
            height: "100px",
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            fontSize: '10px', 
            outline: 'none', // Remove outline on focus
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            resize: 'none', // Prevent resizing if desired
          }}
        />
        <Button variant="contained" onClick={handleNoteOperation}>
          {editingNoteId ? 'Update Note' : 'Save Note'}
        </Button>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 0.3fr)', gap: 3 }}>
        {notes.map((note) => (
          <Box key={note.noteId} sx={{
            backgroundColor: '#ffeb3b', //yellow
            padding: '20px 10px 10px',
            width: '180px',
            height: '180px',
            borderRadius: 2,
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.4)',
            fontSize: '14px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', }}>
              <span>{note.content}</span>
              <div>
                <IconButton onClick={() => handleEdit(note)} sx={{ position: 'absolute', top: -6, right: 20 }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDelete(note.noteId)} sx={{ position: 'absolute', top: -6, right: -5 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
