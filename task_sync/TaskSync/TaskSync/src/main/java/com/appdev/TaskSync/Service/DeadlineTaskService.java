package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.DeadlineTaskEntity;
import com.appdev.TaskSync.Repository.DeadlineTaskRepository;

@Service
public class DeadlineTaskService {
	@Autowired
	DeadlineTaskRepository drepo;

	public DeadlineTaskService() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DeadlineTaskEntity postDeadlineTask(DeadlineTaskEntity deadlineTask) {
		return drepo.save(deadlineTask);
	}
	public List<DeadlineTaskEntity>getAllDeadlineTask(){
		return drepo.findAll();
	}
	@SuppressWarnings("finally")
	public DeadlineTaskEntity putDeadlineTask(int id, DeadlineTaskEntity newDeadlineTaskDetails) {
		DeadlineTaskEntity deadlineTask=new DeadlineTaskEntity();
		try {
			deadlineTask=drepo.findById(id).get();
			deadlineTask.setUser(newDeadlineTaskDetails.getUser());
			deadlineTask.setDescription(newDeadlineTaskDetails.getDescription());
			deadlineTask.setMark(newDeadlineTaskDetails.getMark());
			deadlineTask.setCompleted(newDeadlineTaskDetails.isCompleted());
		} catch(NoSuchElementException nex) {
			throw new NameNotFoundException("DeadlineTask " + id + " not found!");
		} finally  {
			return drepo.save(deadlineTask);
		}
	}
	public String deleteDeadlineTask(int id) {
		String msg="";
		if(drepo.findById(id)!=null) {
			drepo.deleteById(id);
			msg="Successfully deleted.";
		} else 
			msg=id+" not found";
		return msg;
	}
}
