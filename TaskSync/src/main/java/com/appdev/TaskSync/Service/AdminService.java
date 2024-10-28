package com.appdev.TaskSync.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.AdminEntity;
import com.appdev.TaskSync.Repository.AdminRepository;

@Service
public class AdminService {
	@Autowired
	AdminRepository arepo;

	public AdminService() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public AdminEntity postAdmin(AdminEntity admin) {
		return arepo.save(admin);
	}
	
	public List<AdminEntity> getAllAdmin() {
		return arepo.findAll();
	}
	
	@SuppressWarnings("finally")
	public AdminEntity putAdmin(int adminId, AdminEntity newAdminDetails) {
		AdminEntity admin = new AdminEntity();
		try {
			admin = arepo.findById(adminId).get();
			
			admin.setUsers(newAdminDetails.getUsers());
			admin.setUsername(newAdminDetails.getUsername());
			admin.setEmail(newAdminDetails.getEmail());
			admin.setPassword(newAdminDetails.getPassword());
		} catch(NoSuchElementException nex) {
			throw new NameNotFoundException("Admin " + adminId + " not found!");
		} finally {
			return arepo.save(admin);
		}
	}
	
	public String deleteAdmin(int id) {
		String msg="";
		if(arepo.findById(id)!=null) {
			arepo.deleteById(id);
			msg="Successfully deleted.";
		} else
			msg=id+ " not found.";
		return msg;
	}
}
