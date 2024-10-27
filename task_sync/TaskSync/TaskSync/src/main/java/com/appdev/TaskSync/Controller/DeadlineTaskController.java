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

import com.appdev.TaskSync.Entity.DeadlineTaskEntity;
import com.appdev.TaskSync.Service.DeadlineTaskService;

@RestController
@RequestMapping(method=RequestMethod.GET,path="/api/deadlineTask")
public class DeadlineTaskController {
	@Autowired
	DeadlineTaskService dserv;
	@PostMapping("/postDeadlineTask")
	public DeadlineTaskEntity postDeadlineTask(@RequestBody DeadlineTaskEntity deadlineTask) {
		return dserv.postDeadlineTask(deadlineTask);
	}
	@GetMapping("/getAllDeadlineTask")
	public List<DeadlineTaskEntity> getAllDeadlineTask() {
		return dserv.getAllDeadlineTask();
	}
	@PutMapping("/putDeadlineTask")
	public DeadlineTaskEntity putDeadlineTask(@RequestParam int id, @RequestBody DeadlineTaskEntity newDeadlineTaskDetails) {
		return dserv.putDeadlineTask(id,newDeadlineTaskDetails);
	}
	@DeleteMapping("/deleteDeadlineTask")
	public String deleteDeadlineTask(@PathVariable int id) {
		return dserv.deleteDeadlineTask(id);
	}
}
