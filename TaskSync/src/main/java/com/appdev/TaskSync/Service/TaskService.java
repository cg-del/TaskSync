package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.TaskEntity;
import com.appdev.TaskSync.Repository.TaskRepository;

@Service
public class TaskService {
	@Autowired
	TaskRepository trepo;

	public TaskService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public TaskEntity postTask(TaskEntity task) {
		return trepo.save(task);
	}
	
	public List<TaskEntity> getAllTask() {
		return trepo.findAll();
	}
	@SuppressWarnings("finally")
	public TaskEntity putTask(int taskId, TaskEntity newTaskDetails) {
		TaskEntity task=new TaskEntity();
		try {
			task=trepo.findById(taskId).get();
			
			task.setUser(newTaskDetails.getUser());
			task.setTitle(newTaskDetails.getTitle());
			task.setDescription(newTaskDetails.getDescription());
			task.setCompleted(newTaskDetails.isCompleted());
			task.setDeadline(newTaskDetails.getDeadline());
		}catch(NoSuchElementException nex) {
			throw new NameNotFoundException("Task " + taskId + " not found!");
		} finally {
			return trepo.save(task);
		}
	}
	
	public String deleteTask(int id) {
		String msg="";
		if(trepo.findById(id)!=null) {
			trepo.deleteById(id);
			msg="Successfully deleted.";
		}else 
			msg=id+" not found.";
		return msg;
	}
}
