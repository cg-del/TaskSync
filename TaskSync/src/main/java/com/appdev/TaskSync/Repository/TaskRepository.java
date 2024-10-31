package com.appdev.TaskSync.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.TaskSync.Entity.TaskEntity;

public interface TaskRepository extends JpaRepository<TaskEntity,Integer>{
	List<TaskEntity> findByUser_UserId(int userId);
}
