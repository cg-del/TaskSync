import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check'; // Import CheckIcon

export default function SimplePaper() {
  const [notes, setNotes] = useState([]);  // State to hold sticky notes

  const addNote = () => {
    setNotes([...notes.map(note => ({ ...note, editable: false })), { content: '', editable: true }]);
  };

  const updateNote = (index, content) => {
    const updatedNotes = notes.map((note, i) => (i === index ? { ...note, content } : note));
    setNotes(updatedNotes);  // Update the specific note
  };

  const saveNote = (index) => {
    const updatedNotes = notes.map((note, i) => {
      if (i === index) {
        return { ...note, editable: false }; // Save the note and set editable to false
      }
      return note; // Keep other notes unchanged
    });
    setNotes(updatedNotes);
  };

  const toggleEdit = (index) => {
    const updatedNotes = notes.map((note, i) => {
      if (i === index) {
        return { ...note, editable: !note.editable }; // Toggle editable state
      }
      return note; // Keep other notes unchanged
    });
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={addNote}>
          Add Sticky Note
        </Button>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
        }}
      >
        {notes.map((note, index) => (
          <Box key={index} className="sticky-note">
            <Paper elevation={0} className="note-content">
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {note.editable ? (
                  <textarea
                    value={note.content}
                    onChange={(e) => updateNote(index, e.target.value)}
                    placeholder="Empty Note..."
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      backgroundColor: 'transparent',
                      resize: 'none',
                      outline: 'none',
                      padding: '10px',  // Adjust padding as needed
                      textAlign: 'left', // Align text to the left
                      lineHeight: '1.5',
                      boxSizing: 'border-box', // Ensure padding is included in width/height
                    }}
                  />
                ) : (
                  <div style={{ padding: '10px', textAlign: 'left' }}>{note.content || "Empty Note"}</div>
                )}
                <IconButton
                  onClick={() => saveNote(index)} // Save note on check icon click
                  sx={{ position: 'absolute', top: -8, right: 35 }} // Adjust position
                >
                  <CheckIcon fontSize="default" />
                </IconButton>
                <IconButton
                  onClick={() => toggleEdit(index)}
                  sx={{ position: 'absolute', top: -5, right: 15 }} // Adjust position
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => deleteNote(index)}
                  sx={{ position: 'absolute', top: -5, right: -5 }} // Adjust position
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </Paper>
          </Box>
        ))}
      </Box>

      <style jsx>{`
        .sticky-note {
          position: relative;  /* Positioning for the pin */
        }

        .note-content {
          background-color: #ffeb3b;  /* Yellow background */
          border-radius: 8px;  /* Rounded corners */
          padding: 0;  /* No padding for the note content */
          height: 200px;  /* Fixed height for uniformity */
          width: 200px;
          display: block;  /* Use block layout */
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </Box>
  );
}