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
@Table(name="DeadlineTask")
public class DeadlineTaskEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int deadlineTaskId;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private UserEntity user;
	private String description;
	@Column(nullable=false)
	private LocalDateTime mark;
	public DeadlineTaskEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DeadlineTaskEntity(int deadlineTaskId, UserEntity user, String description, LocalDateTime mark,
			boolean isCompleted) {
		super();
		this.deadlineTaskId = deadlineTaskId;
		this.user = user;
		this.description = description;
		this.mark = mark;
	}
	public int getDeadlineTaskId() {
		return deadlineTaskId;
	}
	public void setDeadlineTaskId(int deadlineTaskId) {
		this.deadlineTaskId = deadlineTaskId;
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
	public LocalDateTime getMark() {
		return mark;
	}
	public void setMark(LocalDateTime mark) {
		this.mark = mark;
	}
	
}
