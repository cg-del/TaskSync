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

import com.appdev.TaskSync.Entity.TimerEntity;
import com.appdev.TaskSync.Service.TimerService;

@RestController
@RequestMapping(method=RequestMethod.GET,path="/api/timer")
public class TimerController {
	@Autowired
	TimerService tserv;
	
	
	@PostMapping("/postTimer")
	public TimerEntity postTimer(@RequestBody TimerEntity timer) {
		return tserv.postTimer(timer);
	}
	
	@GetMapping("/getAllTimer") 
	public List<TimerEntity>getAllTimer() {
		return tserv.getAllTimer();
	}
	
	@PutMapping("/putTimer")
	public TimerEntity putTimer(@RequestParam int id, @RequestBody TimerEntity newTimerDetails) {
		return tserv.putTimer(id,newTimerDetails);
	}
	@DeleteMapping("/deleteTimer")
	public String deleteTimer(@PathVariable int id) {
		return tserv.deleteTimer(id);
	}
}
