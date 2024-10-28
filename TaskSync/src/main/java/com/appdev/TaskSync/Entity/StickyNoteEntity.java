<<<<<<< HEAD:TaskSync/src/main/java/com/appdev/TaskSync/Entity/StickyNoteEntity.java
package com.appdev.TaskSync.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="sticky_notes")
public class StickyNoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noteId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private String content;

    private String color;

    // Constructors, getters, and setters
    public StickyNoteEntity() {
        super();
    }

    public StickyNoteEntity(int noteId, UserEntity user, String content, String color) {
        this.noteId = noteId;
        this.user = user;
        this.content = content;
        this.color = color;
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

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
=======
package com.appdev.TaskSync.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="sticky_notes")
public class StickyNoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noteId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private String content;

    private String color;

    // Constructors, getters, and setters
    public StickyNoteEntity() {
        super();
    }

    public StickyNoteEntity(int noteId, UserEntity user, String content, String color) {
        this.noteId = noteId;
        this.user = user;
        this.content = content;
        this.color = color;
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

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
>>>>>>> parent of e7f9003 (update):task_sync/TaskSync/TaskSync/src/main/java/com/appdev/TaskSync/Entity/StickyNoteEntity.java
