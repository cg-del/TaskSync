package com.appdev.TaskSync.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.TaskSync.Entity.TaskCalendarEntity;

@Repository
public interface TaskCalendarRepository extends JpaRepository<TaskCalendarEntity, Integer> {

    List<TaskCalendarEntity> findByUserUserId(int userId);

    List<TaskCalendarEntity> findByDate(LocalDate date);
}
