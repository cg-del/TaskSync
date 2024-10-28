package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.AnalyticsEntity;
import com.appdev.TaskSync.Repository.AnalyticsRepository;

@Service
public class AnalyticsService {

	@Autowired
	AnalyticsRepository arepo;

	public AnalyticsService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public AnalyticsEntity postAnalytics(AnalyticsEntity analytics) {
		return arepo.save(analytics);
	}
	public List<AnalyticsEntity>getAllAnalytics() {
		return arepo.findAll();
	}
	@SuppressWarnings("finally")
	public AnalyticsEntity putAnalytics(int analyticsId, AnalyticsEntity newAnalyticsDetails) {
		AnalyticsEntity analytics = new AnalyticsEntity();
		try {
			analytics=arepo.findById(analyticsId).get();
			analytics.setUser(newAnalyticsDetails.getUser());
			analytics.setTaskCompletionRate(newAnalyticsDetails.getTaskCompletionRate());
			analytics.setAvgTimeSpentPerTask(newAnalyticsDetails.getAvgTimeSpentPerTask());
		} catch(NoSuchElementException nex) {
			throw new NameNotFoundException("Analytics " + analyticsId + " not found!");
		} finally {
			return arepo.save(analytics);
		}
	}
	public String deleteAnalytics(int id) {
		String msg="";
		if(arepo.findById(id)!=null) {
			arepo.deleteById(id);
			msg="Successfully deleted.";
		} else
			msg=id+" not found.";
		return msg;
	}
}
