package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.TimerEntity;
import com.appdev.TaskSync.Repository.TimerRepository;

@Service
public class TimerService {
	@Autowired
	TimerRepository trepo;

	public TimerService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public TimerEntity postTimer(TimerEntity timer) {
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
			
			timer.setUser(newTimerDetails.getUser());
			timer.setDuration(newTimerDetails.getDuration());
			timer.setStartTime(newTimerDetails.getStartTime());
			timer.setEndTime(newTimerDetails.getEndTime());
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
