package com.appdev.TaskSync.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.TaskSync.Entity.StickyNoteEntity;
import com.appdev.TaskSync.Service.StickyNoteService;


@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/stickynote")
public class StickyNoteController {
    @Autowired
    StickyNoteService sserv;

    // Create a new stickynote
    @PostMapping("/postStickynote")
    public StickyNoteEntity postStickynote(@RequestBody StickyNoteEntity stickynote) {
        return sserv.postStickynote(stickynote);
    }
 
    // Get all stickynotes
    @GetMapping("/getAllStickynotes")
    public List<StickyNoteEntity> getAllStickynotes() {
        return sserv.getAllStickynotes();
    }
 
    // Update stickynote details
    @PutMapping("/putStickynoteDetails")
    public StickyNoteEntity putStickynoteDetails(@RequestParam int id, @RequestBody StickyNoteEntity newStickynoteDetails) {
        return sserv.putStickynoteDetails(id, newStickynoteDetails);
    }
 
    // Delete a stickynote
    @DeleteMapping("/deleteStickynoteDetails/{id}")
    public String deleteStickynote(@PathVariable int id) {
        return sserv.deleteStickynote(id);
    }
    
}

