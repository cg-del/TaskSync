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

import com.appdev.TaskSync.Entity.AnalyticsEntity;
import com.appdev.TaskSync.Service.AnalyticsService;

@RestController
@RequestMapping(method=RequestMethod.GET,path="/api/analytics")
public class AnalyticsController {
	@Autowired
	AnalyticsService aserv;
	@PostMapping("/postAnalytics")
	public AnalyticsEntity postAnalytics(@RequestBody AnalyticsEntity analytics) {
		return aserv.postAnalytics(analytics);
	}
	@GetMapping("/getAllAnalytics")
	public List<AnalyticsEntity> getAllAnalytics() {
		return aserv.getAllAnalytics();
	}
	@PutMapping("/putAnalytics")
	public AnalyticsEntity putAnalytics(@RequestParam int id,@RequestBody AnalyticsEntity newAnalyticsDetails) {
		return aserv.putAnalytics(id, newAnalyticsDetails);
	}
	@DeleteMapping("/deleteAnalytics")
	public String deleteAnalytics(@PathVariable int id) {
		return aserv.deleteAnalytics(id);
	}
}
