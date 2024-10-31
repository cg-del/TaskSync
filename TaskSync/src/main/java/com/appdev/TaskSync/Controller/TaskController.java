package com.appdev.TaskSync.Controller;

import java.util.List;
import java.util.Optional;

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

import com.appdev.TaskSync.Entity.TaskEntity;
import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Repository.UserRepository;
import com.appdev.TaskSync.Service.TaskService;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService tserv;

    @Autowired
	UserRepository urepo;

    @PostMapping("/postTask")
    public TaskEntity postTask(@RequestBody TaskEntity task) {
        return tserv.postTask(task);
    }

    @GetMapping("/getAllTask")
    public List<TaskEntity> getAllTask() {
        return tserv.getAllTask();
    }

    @PutMapping("/putTask")
public ResponseEntity<?> updateTask(@RequestParam int id, @RequestBody TaskEntity task) {
    Optional<UserEntity> user = Optional.ofNullable(urepo.findByEmail(task.getUser().getEmail())); // Use 'urepo' here
    if (user.isPresent()) {
        task.setUser(user.get()); // Attach the persisted UserEntity
        TaskEntity updatedTask = tserv.putTask(id, task); // Call the service layer's `putTask` method
        return ResponseEntity.ok(updatedTask);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}


    @DeleteMapping("/deleteTask/{id}")
    public String deleteTask(@PathVariable int id) {
        return tserv.deleteTask(id);
    }

    @GetMapping("/getTasksByUser")
    public List<TaskEntity> getTasksByUser(@RequestParam int userId) {
        return tserv.getTasksByUserId(userId);
    }
}
