import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import { useUser } from '../UserContext'; // Import UserContext for user details
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';

export default function StickyNotes() {
  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

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
      } else {
        // Add new note
        const response = await axios.post('http://localhost:8080/api/stickynote/postStickynote', noteData);
        setNotes((prevNotes) => [...prevNotes, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error adding/updating note:', error.response?.data || error.message);
    }
  };

  const handleEdit = (note) => {
    setNewNoteContent(note.content);
    setEditingNoteId(note.noteId); // Set the ID of the note being edited
    setOpenAddTaskModal(true); // Open the modal for editing
  };

  const resetForm = () => {
    setNewNoteContent('');
    setEditingNoteId(null);
    setOpenAddTaskModal(false); // Close the modal after adding/updating
  };

  const openDeleteConfirmationModal = (noteId) => {
    setNoteToDelete(noteId);
    setOpenDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (!noteToDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/stickynote/deleteStickynoteDetails/${noteToDelete}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteToDelete));
      setOpenDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting note:', error.response?.data || error.message);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirmation(false);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Button variant="contained" onClick={() => setOpenAddTaskModal(true)}>
        Add Note
      </Button>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteConfirmation} onClose={handleCancelDelete}>
          <ModalDialog variant="outlined" role="alertdialog" sx={{ borderRadius: 4 }}>
              <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Delete Task</DialogTitle>
              <DialogContent>
                  <Typography sx={{ marginBottom: 2 }}>Are you sure you want to delete this note?</Typography>
              </DialogContent>
              <DialogActions 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end'
                  }}
                > {/* Align buttons to the right */}
                  <Button variant="outlined" color="neutral" onClick={handleCancelDelete} sx={{ marginRight: 1 }}>
                      Cancel
                  </Button>
                  <Button variant="outlined" color="danger" onClick={handleDelete} sx={{ borderColor: 'red', color: 'red' }}>
                      Delete
                  </Button>
              </DialogActions>
          </ModalDialog>
      </Modal>

      {/* Add Task Modal */}
      <Modal open={openAddTaskModal} onClose={resetForm}>
        <ModalDialog sx={{ maxWidth: '350px', width: '100%' }}>
          <DialogTitle>
            {editingNoteId ? 'Edit Note' : 'Add Task'}
            <IconButton
              aria-label="close"
              onClick={resetForm}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'gray',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <p style={{ margin: '0 0 10px' }}>
              {editingNoteId ? 'Edit your note to update any details here' : 'Add your note, reminder, or thought here'}</p> {/* Description */}
              <FormControl sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <textarea
                placeholder="Type your note here..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                style={{
                  width: "250px", // input change size
                  height: "120px",
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none', // Remove outline on focus
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  resize: 'none', // Prevent resizing if desired
                  overflow: 'auto', // Allow scrolling if needed
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNoteOperation} variant="contained" color="primary">
              {editingNoteId ? 'Update Note' : 'Add Task'}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 0.3fr)', gap: 3, marginTop: 2 }}>
        {notes.map((note) => (
          <Box key={note.noteId} sx={{
            backgroundColor: '#ffeb3b', //yellow //extra color #ffda33
            padding: '28px 10px 10px',
            width: '250px',
            height: '250px', // size sa stickynote
            borderRadius: 2,
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.4)',
            fontSize: '18px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', }}>
              <span>{note.content}</span>
              <div>
                <IconButton onClick={() => handleEdit(note)} sx={{ position: 'absolute', top: -6, right: 20, color: 'primary.main' }}>
                  <EditIcon fontSize="default" />
                </IconButton>
                <IconButton onClick={() => openDeleteConfirmationModal(note.noteId)} sx={{ position: 'absolute', top: -6, right: -5, color: 'red' }}>
                  <DeleteIcon fontSize="default" />
                </IconButton>
              </div>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
}