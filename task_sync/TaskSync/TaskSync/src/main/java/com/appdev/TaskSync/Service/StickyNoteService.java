package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.StickyNoteEntity;
import com.appdev.TaskSync.Repository.StickyNoteRepository;

@Service
public class StickyNoteService {

	@Autowired
	StickyNoteRepository stickynoteRepo;

	public StickyNoteService() {
		super();
	}

	// Create a new stickynote
	public StickyNoteEntity postStickynoteRecord(StickyNoteEntity stickynote) {
		return stickynoteRepo.save(stickynote);
	}

	// Read all stickynotes
	public List<StickyNoteEntity> getAllStickynotes() {
		return stickynoteRepo.findAll();
	}

	// Update stickynote details
	public StickyNoteEntity putStickynoteDetails(int id, StickyNoteEntity newStickynoteDetails) {
		StickyNoteEntity stickynote;
		try {
			// Search the stickynote by id
			stickynote = stickynoteRepo.findById(id).get();
			stickynote.setContent(newStickynoteDetails.getContent());
			stickynote.setColor(newStickynoteDetails.getColor());
			stickynote.setUser(newStickynoteDetails.getUser());
		} catch (NoSuchElementException nex) {
			throw new RuntimeException("Stickynote " + id + " not found");
		}
		return stickynoteRepo.save(stickynote);
	}

	// Delete a stickynote
	public String deleteStickynote(int id) {
		if (stickynoteRepo.findById(id).isPresent()) {
			stickynoteRepo.deleteById(id);
			return "Stickynote record successfully deleted!";
		} else {
			return "Stickynote with ID " + id + " not found!";
		}
	}
}
