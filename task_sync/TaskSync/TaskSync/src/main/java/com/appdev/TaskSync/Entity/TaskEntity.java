package com.appdev.TaskSync.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
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
	
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="user_id",referencedColumnName="userId",nullable=false)
	private UserEntity user;
	
	@Column(nullable=false)
	private String title;
	
	private String description;
	
	private boolean isCompleted;
	
	private LocalDateTime deadline;

	public TaskEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TaskEntity(int taskId, UserEntity user, String title, String description, boolean isCompleted,
			LocalDateTime deadline) {
		super();
		this.taskId = taskId;
		this.user = user;
		this.title = title;
		this.description = description;
		this.isCompleted = isCompleted;
		this.deadline = deadline;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isCompleted() {
		return isCompleted;
	}

	public void setCompleted(boolean isCompleted) {
		this.isCompleted = isCompleted;
	}

	public LocalDateTime getDeadline() {
		return deadline;
	}

	public void setDeadline(LocalDateTime deadline) {
		this.deadline = deadline;
	}
	
}
