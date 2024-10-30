package com.appdev.TaskSync.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.TaskSync.Entity.StickyNoteEntity;

@Repository
public interface StickyNoteRepository extends JpaRepository <StickyNoteEntity, Integer>{
 
}