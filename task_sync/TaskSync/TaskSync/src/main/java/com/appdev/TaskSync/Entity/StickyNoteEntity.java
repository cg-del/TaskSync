package com.appdev.TaskSync.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="sticky_notes")
public class StickyNoteEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int noteId; 
	
	
	private UserEntity user;
	
	@Column(nullable=false)
    private String content;
    private String color;
    
    
    
	public StickyNoteEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
    public int getNoteId() {
		return noteId;
	}
	public void setNoteId(int noteId) {
		this.noteId = noteId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	private int userId;

}