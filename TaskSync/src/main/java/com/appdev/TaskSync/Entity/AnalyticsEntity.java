package com.appdev.TaskSync.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Analytics")
public class AnalyticsEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int analyticsId;
	
	@OneToOne
	@JoinColumn(name="user_id",nullable=false)
	private UserEntity user;
	
	private float taskCompletionRate;
	
	private float avgTimeSpentPerTask;

	public AnalyticsEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AnalyticsEntity(int analyticsId, UserEntity user, float taskCompletionRate, float avgTimeSpentPerTask) {
		super();
		this.analyticsId = analyticsId;
		this.user = user;
		this.taskCompletionRate = taskCompletionRate;
		this.avgTimeSpentPerTask = avgTimeSpentPerTask;
	}

	public int getAnalyticsId() {
		return analyticsId;
	}

	public void setAnalyticsId(int analyticsId) {
		this.analyticsId = analyticsId;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public float getTaskCompletionRate() {
		return taskCompletionRate;
	}

	public void setTaskCompletionRate(float taskCompletionRate) {
		this.taskCompletionRate = taskCompletionRate;
	}

	public float getAvgTimeSpentPerTask() {
		return avgTimeSpentPerTask;
	}

	public void setAvgTimeSpentPerTask(float avgTimeSpentPerTask) {
		this.avgTimeSpentPerTask = avgTimeSpentPerTask;
	}
	
	
}
