package com.appdev.TaskSync.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.TaskSync.Entity.AdminEntity;
import com.appdev.TaskSync.Service.AdminService;

@RestController
@RequestMapping(method=RequestMethod.GET,path="/api/admin")
public class AdminController {
	@Autowired
	AdminService aserv;
	
	@PostMapping("/postAdmin")
	public AdminEntity postAdmin(@RequestBody AdminEntity admin) {
		return aserv.postAdmin(admin);
	}
	@GetMapping("/getAllAdmin")
	public List<AdminEntity>getAllAdmin() {
		return aserv.getAllAdmin();
	}
	@PutMapping("/putAdmin")
	public AdminEntity putAdmin(@RequestParam int id, @RequestBody AdminEntity newAdminDetails) {
		return aserv.putAdmin(id, newAdminDetails);
	}
	@DeleteMapping("/deleteAdmin") 
	public String deleteAdmin(@PathVariable int id) {
		return aserv.deleteAdmin(id);
	}
}
