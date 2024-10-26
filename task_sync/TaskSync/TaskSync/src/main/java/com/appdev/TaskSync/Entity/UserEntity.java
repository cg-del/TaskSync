package com.appdev.TaskSync.Entity;

import java.util.List;
import java.util.Timer;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
	
	@OneToMany(mappedBy="userId", cascade=CascadeType.ALL, fetch= FetchType.LAZY)
	private List<Timer> timers;
	

	public UserEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public UserEntity(int userId, String username, String email, String password, String occupation,
			List<Timer> timers) {
		super();
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.password = password;
		this.occupation = occupation;
		this.timers = timers;
	}
	
	
	public List<Timer> getTimers() {
		return timers;
	}
	public void setTimers(List<Timer> timers) {
		this.timers = timers;
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
	
}
