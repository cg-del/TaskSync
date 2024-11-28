import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Button from '@mui/joy/Button';
import Divider from '@mui/material/Divider';

export default function StickyNoteBoardView() {
  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  if (!user) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/stickynote/getStickynotesByUser?userId=${user.userId}`);
          setNotes(response.data);
        } catch (error) {
          console.error('Error fetching sticky notes:', error.response?.data || error.message);
        }
      };
      fetchNotes();
    }
  }, [user]);

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

  const openDeleteConfirmationModal = (noteId) => {
    setNoteToDelete(noteId);
    setOpenDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirmation(false);
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxHeight: '80vh',
        padding: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#4259c1',
          borderRadius: '4px',
        },
      }}>
        {notes.map((note) => (
          <Box
            key={note.noteId}
            sx={{
              backgroundColor: '#7ec9ed',
              padding: '40px 15px 15px',
              borderRadius: '8px',
              position: 'relative',
              minHeight: '100px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              },
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start'
            }}>
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  flex: 1,
                  fontSize: '16px',
                  color: '#1f295a',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  paddingRight: '40px',
                }}
              >
                {note.content}
              </Typography>
              <div style={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton 
                  onClick={() => handleEdit(note)} 
                  sx={{ 
                    color: '#1f295a',
                    padding: '4px',
                  }}
                >
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  onClick={() => openDeleteConfirmationModal(note.noteId)} 
                  sx={{ 
                    color: '#1f295a',
                    padding: '4px',
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </Box>
        ))}
      </Box>

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
              sx={{ textTransform: 'none' }}
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
                marginLeft: 2,
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box>
  );
}