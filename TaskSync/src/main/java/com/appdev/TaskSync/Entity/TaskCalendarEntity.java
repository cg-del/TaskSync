package com.appdev.TaskSync.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TaskCalendar")
public class TaskCalendarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int calendarId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    @JsonBackReference
    private UserEntity user;

    @Column(name = "task_description", nullable = false) // Ensure the column name matches the database schema
    private String taskDescription;

    @Column(nullable = false)
    private LocalDate date;

    public TaskCalendarEntity() {
        super();
    }

    public TaskCalendarEntity(int calendarId, UserEntity user, String taskDescription, LocalDate date) {
        super();
        this.calendarId = calendarId;
        this.user = user;
        this.taskDescription = taskDescription;
        this.date = date;
    }

    public int getCalendarId() {
        return calendarId;
    }

    public void setCalendarId(int calendarId) {
        this.calendarId = calendarId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
