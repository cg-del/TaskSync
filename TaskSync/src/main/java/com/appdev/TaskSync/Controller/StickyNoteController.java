package com.appdev.TaskSync.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.TaskSync.Entity.StickyNoteEntity;
import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Repository.UserRepository;
import com.appdev.TaskSync.Service.StickyNoteService;

@RestController
@RequestMapping("/api/stickynote")
public class StickyNoteController {
	
    @Autowired
    private StickyNoteService sserv;
    
    @Autowired
    UserRepository urepo;
    
    @PostMapping("/postStickynote")
    public StickyNoteEntity postStickynote(@RequestBody StickyNoteEntity stickynote) {
        return sserv.postStickynote(stickynote);
    }

    @GetMapping("/getAllStickynotes")
    public List<StickyNoteEntity> getAllStickynotes() {
        return sserv.getAllStickynotes();
    }

    @PutMapping("/putStickynoteDetails")
    public ResponseEntity<?> updateStickyNote(@RequestParam int id, @RequestBody StickyNoteEntity stickynote) {
        Optional<UserEntity> user = Optional.ofNullable(urepo.findByEmail(stickynote.getUser().getEmail()));
        if(user.isPresent()) {
        	stickynote.setUser(user.get());
        	StickyNoteEntity updatedStickyNote = sserv.putStickynoteDetails(id, stickynote);
        	return ResponseEntity.ok(updatedStickyNote);
        } else {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
 
    // Delete stickynote
    @DeleteMapping("/deleteStickynoteDetails/{id}")
    public String deleteStickynote(@PathVariable int id) {
        return sserv.deleteStickynote(id);
    }
    
    @GetMapping("/getStickynotesByUser")
    public List<StickyNoteEntity> getStickynotesByUser(@RequestParam int userId){
    	return sserv.getStickynotesByUserId(userId);
    }
}

