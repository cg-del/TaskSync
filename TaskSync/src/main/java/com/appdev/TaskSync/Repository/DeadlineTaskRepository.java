package com.appdev.TaskSync.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.TaskSync.Entity.DeadlineTaskEntity;

public interface DeadlineTaskRepository extends JpaRepository<DeadlineTaskEntity,Integer>{

}
