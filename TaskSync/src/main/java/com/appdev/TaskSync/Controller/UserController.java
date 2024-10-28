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

import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Service.UserService;

@RestController
@RequestMapping(method=RequestMethod.GET,path="/api/user")
public class UserController {
	@Autowired
	UserService userv;
	
	@PostMapping("/postUser")
	public UserEntity postUser(@RequestBody UserEntity user) {
		return userv.postUser(user);
	}
	@GetMapping("/getAllUser")
	public List<UserEntity> getAllUser(){
		return userv.getAllUser();
	}
	@PutMapping("/putUser")
	public UserEntity putUser(@RequestParam int id, @RequestBody UserEntity newUserDetails) {
		return userv.putUser(id, newUserDetails);
	}
	@DeleteMapping("/deleteUser")
	public String deleteUser(@PathVariable int id) {
		return userv.deleteUser(id);
	}
}
