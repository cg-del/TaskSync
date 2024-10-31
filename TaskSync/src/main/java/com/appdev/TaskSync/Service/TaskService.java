package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.TaskEntity;
import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Repository.TaskRepository;
import com.appdev.TaskSync.Repository.UserRepository;

@Service
public class TaskService {

    @Autowired
    TaskRepository trepo;

    @Autowired
    UserRepository urepo;

    public TaskService() {
        super();
    }

    // Retrieve all tasks for a specific user by userId
    public List<TaskEntity> getTasksByUserId(int userId) {
        return trepo.findByUser_UserId(userId);
    }

    // Add a new task, associating it with a user by email
    public TaskEntity postTask(TaskEntity task) {
        UserEntity user = urepo.findByEmail(task.getUser().getEmail());
        if (user == null) {
            throw new IllegalArgumentException("User not found with email: " + task.getUser().getEmail());
        }
        task.setUser(user);
        return trepo.save(task);
    }

    // Retrieve all tasks
    public List<TaskEntity> getAllTask() {
        return trepo.findAll();
    }

    // Update an existing task based on task ID
    @SuppressWarnings("finally")
	public TaskEntity putTask(int taskId, TaskEntity newTaskDetails){
        TaskEntity task = new TaskEntity();
        try {
            task = trepo.findById(taskId).get();
            
            task.setUser(newTaskDetails.getUser());
            task.setDescription(newTaskDetails.getDescription());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Task " + taskId + " not found!");
        }finally {
        	return trepo.save(task);
        }
        
    }

    // Delete a task by ID and return a confirmation message
    public String deleteTask(int id) {
        String msg="";
        if (trepo.findById(id)!=null) {
            trepo.deleteById(id);
            msg="Task successfully deleted.";
        } else
            msg=id + "not found";
        return msg;
    }
}
