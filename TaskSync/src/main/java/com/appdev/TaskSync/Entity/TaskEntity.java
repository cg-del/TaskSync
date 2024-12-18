package com.appdev.TaskSync.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Task")
public class TaskEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int taskId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id",referencedColumnName="userId",nullable=false)
	@JsonBackReference
	private UserEntity user;
	
	@Column(nullable=false)
	private String description;

	private boolean isComplete;

	public TaskEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TaskEntity(int taskId, UserEntity user, String description, boolean isComplete) {
		super();
		this.taskId = taskId;
		this.user = user;
		this.description = description;
		this.isComplete = isComplete;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getIsComplete() {
		return isComplete;
	}

	public void setIsComplete(boolean isComplete) {
		this.isComplete = isComplete;
	}
}
