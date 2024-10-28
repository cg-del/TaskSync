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
    StickyNoteService stickynoteService;
 
    // Test print
    @GetMapping("/print")
    public String print() {
        return "Hello, Stickynote Management";
    }
 
    // Create a new stickynote
    @PostMapping("/postStickynoteRecord")
    public StickyNoteEntity postStickynoteRecord(@RequestBody StickyNoteEntity stickynote) {
        return stickynoteService.postStickynoteRecord(stickynote);
    }
 
    // Get all stickynotes
    @GetMapping("/getAllStickynotes")
    public List<StickyNoteEntity> getAllStickynotes() {
        return stickynoteService.getAllStickynotes();
    }
 
    // Update stickynote details
    @PutMapping("/putStickynoteDetails")
    public StickyNoteEntity putStickynoteDetails(@RequestParam int id, @RequestBody StickyNoteEntity newStickynoteDetails) {
        return stickynoteService.putStickynoteDetails(id, newStickynoteDetails);
    }
 
    // Delete a stickynote
    @DeleteMapping("/deleteStickynoteDetails/{id}")
    public String deleteStickynote(@PathVariable int id) {
        return stickynoteService.deleteStickynote(id);
    }
}

