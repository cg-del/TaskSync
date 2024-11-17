package com.appdev.TaskSync.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.TaskSync.Entity.TaskCalendarEntity;
import com.appdev.TaskSync.Entity.UserEntity;
import com.appdev.TaskSync.Repository.TaskCalendarRepository;
import com.appdev.TaskSync.Repository.UserRepository;

@Service
public class TaskCalendarService {

    @Autowired
    private TaskCalendarRepository taskCalendarRepo;

    @Autowired
    private UserRepository userRepo;

    public List<TaskCalendarEntity> getTasksByUserId(int userId) {
        return taskCalendarRepo.findByUser_UserId(userId);
    }

    public TaskCalendarEntity addTask(TaskCalendarEntity taskCalendar) {
        UserEntity user = userRepo.findById(taskCalendar.getUser().getUserId())
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + taskCalendar.getUser().getUserId()));
        taskCalendar.setUser(user);
        return taskCalendarRepo.save(taskCalendar);
    }

    public List<TaskCalendarEntity> getAllTasks() {
        return taskCalendarRepo.findAll();
    }

    public TaskCalendarEntity updateTask(int calendarId, TaskCalendarEntity newTaskDetails) {
        TaskCalendarEntity taskCalendar = taskCalendarRepo.findById(calendarId)
            .orElseThrow(() -> new NoSuchElementException("TaskCalendar " + calendarId + " not found!"));
    
        if (newTaskDetails.getUser() != null && newTaskDetails.getUser().getUserId() != 0) {
            UserEntity user = userRepo.findById(newTaskDetails.getUser().getUserId())
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + newTaskDetails.getUser().getUserId()));
            taskCalendar.setUser(user);
        }
    
        taskCalendar.setDate(newTaskDetails.getDate());
        taskCalendar.setTaskDescription(newTaskDetails.getTaskDescription());
        return taskCalendarRepo.save(taskCalendar);
    }

    public String deleteTask(int calendarId) {
        if (taskCalendarRepo.existsById(calendarId)) {
            taskCalendarRepo.deleteById(calendarId);
            return "TaskCalendar successfully deleted.";
        }
        return "TaskCalendar " + calendarId + " not found!";
    }

    public List<TaskCalendarEntity> getTasksByDate(LocalDate date) {
        return taskCalendarRepo.findByDate(date);
    }

    public List<TaskCalendarEntity> getTasksByDateRange(int userId, LocalDate startDate, LocalDate endDate) {
        return taskCalendarRepo.findByUser_UserIdAndDateBetween(userId, startDate, endDate);
    }
}