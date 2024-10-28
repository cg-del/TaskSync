package com.appdev.TaskSync.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="User")
public class UserEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int userId;
	
	@Column(nullable=false)
	private String username;
	@Column(nullable=false,unique=true)
	private String email;
	@Column(nullable=false)
	private String password;
	@Column(nullable=false)
	private String occupation;
	

	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL, fetch= FetchType.LAZY)
	private List<TimerEntity> timers;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL, fetch=FetchType.LAZY)	
	private List<StickyNoteEntity> stickyNotes;

	@OneToMany(mappedBy="user", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	private List<TaskEntity> tasks;
	
	@OneToOne(mappedBy="user", cascade = CascadeType.ALL)
	private AnalyticsEntity analytics;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	private List<DeadlineTaskEntity> deadlineTasks;
	
	public UserEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserEntity(int userId, String username, String email, String password, String occupation,
			List<TimerEntity> timers, List<StickyNoteEntity> stickyNotes, List<TaskEntity> tasks,
			AnalyticsEntity analytics, List<DeadlineTaskEntity> deadlineTasks) {
		super();
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.password = password;
		this.occupation = occupation;
		this.timers = timers;
		this.stickyNotes = stickyNotes;
		this.tasks = tasks;
		this.analytics = analytics;
		this.deadlineTasks = deadlineTasks;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public List<TimerEntity> getTimers() {
		return timers;
	}

	public void setTimers(List<TimerEntity> timers) {
		this.timers = timers;
	}

	public List<StickyNoteEntity> getStickyNotes() {
		return stickyNotes;
	}

	public void setStickyNotes(List<StickyNoteEntity> stickyNotes) {
		this.stickyNotes = stickyNotes;
	}

	public List<TaskEntity> getTasks() {
		return tasks;
	}

	public void setTasks(List<TaskEntity> tasks) {
		this.tasks = tasks;
	}

	public AnalyticsEntity getAnalytics() {
		return analytics;
	}

	public void setAnalytics(AnalyticsEntity analytics) {
		this.analytics = analytics;
	}

	public List<DeadlineTaskEntity> getDeadlineTasks() {
		return deadlineTasks;
	}

	public void setDeadlineTasks(List<DeadlineTaskEntity> deadlineTasks) {
		this.deadlineTasks = deadlineTasks;
	}
	
}
