package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.StickyNoteEntity;
import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Repository.StickyNoteRepository;
import com.appdev.TaskSync.Repository.UserRepository;

@Service
public class StickyNoteService {

	@Autowired
	StickyNoteRepository stickynoteRepo;
	
	@Autowired
	UserRepository urepo;

	public StickyNoteService() {
		super();
	}
	
	// Retrieve all tasks for a specific user by userId
	public List<StickyNoteEntity> getStickynotesByUserId(int userId){
		return stickynoteRepo.findByUser_UserId(userId);
	}
	
	// Create a new stickynote
	public StickyNoteEntity postStickynote(StickyNoteEntity stickynote) {
		UserEntity user = urepo.findByEmail(stickynote.getUser().getEmail());
		if(user == null) {
			throw new IllegalArgumentException("User not found with email: " + stickynote.getUser().getEmail());
		}
		stickynote.setUser(user);
		return stickynoteRepo.save(stickynote);
	}

	// Read all stickynotes
	public List<StickyNoteEntity> getAllStickynotes() {
		return stickynoteRepo.findAll();
	}

	// Update stickynote details
	@SuppressWarnings("finally")
	public StickyNoteEntity putStickynoteDetails(int noteId, StickyNoteEntity newStickynoteDetails) {
		StickyNoteEntity stickynote = new StickyNoteEntity();
		try {
			stickynote = stickynoteRepo.findById(noteId).get();
			
			stickynote.setContent(newStickynoteDetails.getContent());
			stickynote.setUser(newStickynoteDetails.getUser());
		} catch (NoSuchElementException nex) {
			throw new NameNotFoundException("Stickynote " + noteId + " not found");
		} finally {
			return stickynoteRepo.save(stickynote);
		}
		
	}

	// Delete a stickynote
	public String deleteStickynote(int id) {
		String msg="";
		if (stickynoteRepo.findById(id)!=null) {
			stickynoteRepo.deleteById(id);
			msg= "Stickynote successfully deleted!";
		} else 
			msg=id + "not found!";
			return msg;
	}
}
