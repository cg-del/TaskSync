import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import { useUser } from '../UserContext'; // Import UserContext for user details
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Import MoreHoriz icon
import { Navigate } from 'react-router-dom';
 
export default function StickyNotes() {
  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  if (!user) {
    return <Navigate to="/404" replace />;
  }
 
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
    <Box sx={{ width: '95%', padding: 2 }}>
      <Button 
        variant="outlined" 
        sx={{ borderColor: '#4259c1', color: '#4259c1' }} // Match the styles of the Add Task button
        startDecorator={<Add />}
        onClick={() => setOpenAddTaskModal(true)}
      >
        Add Note
      </Button>
 
      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteConfirmation} onClose={handleCancelDelete}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Delete Note</DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this Note?
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="plain"
              color="neutral"
              onClick={handleCancelDelete}
              sx={{ textTransform: 'none', paddingLeft: 0, paddingRight: 0 }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="danger"
              onClick={handleDelete}
              sx={{
                borderColor: 'red',
                color: 'red',
                textTransform: 'none',
                marginLeft: 20, // Adds space between the buttons
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

 
      {/* Add Note Modal */}
      <Modal open={openAddTaskModal} onClose={resetForm}>
        <ModalDialog sx={{ maxWidth: '450px', width: '100%' }}>
          <DialogTitle>
            {editingNoteId ? 'Edit Note' : 'Add Note'}
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
            <Typography variant="body2" sx={{ margin: '0 0 10px' }}>
              {editingNoteId ? 'Edit your note to update any details here' : 'Add your note, reminder, or thought here'}
            </Typography>
            <form onSubmit={(event) => {
              event.preventDefault();
              handleNoteOperation(); // Call the function to add or update the note
            }}>
              <FormControl sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <textarea
                  placeholder="Type your note here..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  style={{
                    width: "90%", // Make it responsive
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
            </form>
          </DialogContent>
          <DialogActions>
          <Button 
            onClick={handleNoteOperation} 
            variant="contained" 
            sx={{ 
              backgroundColor: '#0B6BCB', 
              color: 'white', 
              '&:hover': { 
                backgroundColor: '#0A5DAA' // Darker shade for hover effect
              } 
            }}  // Set custom background color
          >
            {editingNoteId ? 'Update Note' : 'Add Note'}
          </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
 
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 0.3fr)', gap: 3, marginTop: 4 }}>
        {notes.map((note) => (
          <Box key={note.noteId} sx={{
            backgroundColor: '#87ceeb', //yellow //extra color #ffda33 ##ffeb3b ##89CFF0
            padding: '40px 10px 10px',
            borderRadius: '0px 0 25px 0px',
            width: '250px',
            height: '230px',
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '30px',
          }}>
            <Divider sx={{ marginBottom: 1 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', }}>
              <Typography variant="body1" sx={{
                wordWrap: 'break-word',
                flex: 1,
                fontSize: '18px',
                color: 'black'
              }}>
                {note.content}
              </Typography>
              <div>
                <IconButton onClick={() => handleEdit(note)} sx={{ position: 'absolute', top: -1, right: 35, color: 'black' }}>
                  <MoreHorizIcon fontSize="default" />
                </IconButton>
                <IconButton onClick={() => openDeleteConfirmationModal(note.noteId)} sx={{ position: 'absolute', top: -1, right: 1, color: 'black' }}>
                  <CloseIcon fontSize="default" />
                </IconButton>
              </div>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
}