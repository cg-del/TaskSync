package com.appdev.TaskSync.Entity;

import java.util.List;

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
@Table(name="Admin")
public class AdminEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private int adminId;
	
	@OneToMany(mappedBy="admin",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<UserEntity> users;	
	
	@Column(nullable=false)
	private String username;
	@Column(nullable=false,unique=true)
	private String email;
	@Column(nullable=false)
	private String password;
	public AdminEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AdminEntity(int adminId, List<UserEntity> users, String username, String email, String password) {
		super();
		this.adminId = adminId;
		this.users = users;
		this.username = username;
		this.email = email;
		this.password = password;
	}
	public int getAdminId() {
		return adminId;
	}
	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}
	public List<UserEntity> getUsers() {
		return users;
	}
	public void setUsers(List<UserEntity> users) {
		this.users = users;
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
}
