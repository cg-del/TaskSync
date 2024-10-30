package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.apache.logging.log4j.util.Timer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.TimerEntity;
import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Repository.TimerRepository;
import com.appdev.TaskSync.Repository.UserRepository;

@Service
public class TimerService {
	@Autowired
	TimerRepository trepo;
	
	@Autowired
	UserRepository urepo;

	public TimerService() {
		super();
		// TODO Auto-generated constructor stub
	}
	public List<TimerEntity> getTimersByUserId(int userId) {
        return trepo.findByUser_UserId(userId);
    }
	
	
	public TimerEntity postTimer(TimerEntity timer) {
	    UserEntity user = urepo.findByEmail(timer.getUser().getEmail());
	    if (user == null) {
	        throw new IllegalArgumentException("User not found with email: " + timer.getUser().getEmail());
	    }
	    timer.setUser(user);
	    return trepo.save(timer);
	}
	public List<TimerEntity> getAllTimer() {
		return trepo.findAll();
	}
	@SuppressWarnings("finally")
	public TimerEntity putTimer(int timerId,TimerEntity newTimerDetails) {
		TimerEntity timer = new TimerEntity();
		
		try {
			timer=trepo.findById(timerId).get();
			
			timer.setDuration(newTimerDetails.getDuration());
		} catch(NoSuchElementException nex) {
			throw new NameNotFoundException("Timer " + timerId + " not found");
		}
		finally {
			return trepo.save(timer);
		}
	}
	
	public String deleteTimer(int id) {
		String msg="";
		if(trepo.findById(id)!=null) {
			trepo.deleteById(id);
			msg="Timer successfully deleted.";
		} else
			msg=id + "not found";
		return msg;
	}
}
