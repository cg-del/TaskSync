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

import com.appdev.TaskSync.Entity.TaskEntity;
import com.appdev.TaskSync.Service.TaskService;

@RestController
@RequestMapping(method=RequestMethod.GET,path="/api/task")
public class TaskController {
	@Autowired
	TaskService tserv;
	@PostMapping("/postTask") 
	public TaskEntity postTask(@RequestBody TaskEntity task) {
		return tserv.postTask(task);
	}
	@GetMapping("/getAllTask")
	public List<TaskEntity> getAllTask() {
		return tserv.getAllTask();
	}
	@PutMapping("/putTask")
	public TaskEntity putTask(@RequestParam int id, @RequestBody TaskEntity newTaskDetails) {
		return tserv.putTask(id,newTaskDetails);
	}
	@DeleteMapping("/deleteTask")
	public String deleteTask(@PathVariable int id) {
		return tserv.deleteTask(id);
	}
}
