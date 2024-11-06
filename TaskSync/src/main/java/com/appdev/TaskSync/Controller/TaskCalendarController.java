package com.appdev.TaskSync.Controller;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.TaskSync.Entity.TaskCalendarEntity;
import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Repository.UserRepository;
import com.appdev.TaskSync.Service.TaskCalendarService;

@RestController
@RequestMapping("/api/taskcalendar")
public class TaskCalendarController {

    @Autowired
    private TaskCalendarService taskCalendarService;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/addTaskCal")
    public ResponseEntity<TaskCalendarEntity> addTask(@RequestBody TaskCalendarEntity taskCalendar) {
        if (taskCalendar.getUser() == null || taskCalendar.getUser().getUserId() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Return bad request if user or userId is not set
        }

        UserEntity user = userRepo.findById(taskCalendar.getUser().getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + taskCalendar.getUser().getUserId()));
        
        taskCalendar.setUser(user);
        TaskCalendarEntity savedTask = taskCalendarService.addTask(taskCalendar);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @GetMapping("/getAllTasksCal")
    public List<TaskCalendarEntity> getAllTasks() {
        return taskCalendarService.getAllTasks();
    }

    @PutMapping("/updateTaskCal")
    public ResponseEntity<?> updateTask(@RequestParam int calendarId, @RequestBody TaskCalendarEntity taskCalendar) {
        // Check if the user object is provided
        if (taskCalendar.getUser() != null && taskCalendar.getUser().getUserId() != 0) {
            try {
                UserEntity user = userRepo.findById(taskCalendar.getUser().getUserId())
                    .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + taskCalendar.getUser().getUserId()));
                taskCalendar.setUser(user);
            } catch (NoSuchElementException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID not provided");
        }

        try {
            TaskCalendarEntity updatedTask = taskCalendarService.updateTask(calendarId, taskCalendar);
            return ResponseEntity.ok(updatedTask);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteTaskCal/{calendarId}")
    public ResponseEntity<String> deleteTask(@PathVariable int calendarId) {
        String result = taskCalendarService.deleteTask(calendarId);
        if (result.contains("successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }

    @GetMapping("/getTasksCalByUser")
    public List<TaskCalendarEntity> getTasksByUser(@RequestParam int userId) {
        return taskCalendarService.getTasksByUserId(userId);
    }

    @GetMapping("/getTasksCalByDate")
    public List<TaskCalendarEntity> getTasksByDate(@RequestParam String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        return taskCalendarService.getTasksByDate(parsedDate);
    }
}
