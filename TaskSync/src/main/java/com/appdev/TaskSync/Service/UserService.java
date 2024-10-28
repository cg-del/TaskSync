package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository urepo;

	public UserService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public UserEntity postUser(UserEntity user) {
		return urepo.save(user);
	}
	
	public List<UserEntity> getAllUser() {
		return  urepo.findAll();
	}
	
	@SuppressWarnings("finally")
	public UserEntity putUser(int userId, UserEntity newUserDetails) {
		UserEntity user = new UserEntity();
		
		try {
			user = urepo.findById(userId).get();
			
			user.setTimers(newUserDetails.getTimers());
			user.setStickyNotes(newUserDetails.getStickyNotes());
			user.setTasks(newUserDetails.getTasks());
			user.setAnalytics(newUserDetails.getAnalytics());
			user.setDeadlineTasks(newUserDetails.getDeadlineTasks());
			
			user.setUsername(newUserDetails.getUsername());
			user.setEmail(newUserDetails.getEmail());
			user.setPassword(newUserDetails.getPassword());
			user.setOccupation(newUserDetails.getOccupation());
		
		} catch(NoSuchElementException nex) {
			throw new NameNotFoundException("User " + userId + " not found!");
		}
		finally {
			return urepo.save(user);
		}
	}
	
	public String deleteUser(int id) {
		String msg= "";
		if(urepo.findById(id)!=null) {
			urepo.deleteById(id);
			msg="User successfully deleted.";
		} else
			msg=id + " not found.";
		return msg;
	}
}
