package com.appdev.TaskSync.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.TaskSync.Entity.TimerEntity;

public interface TimerRepository extends JpaRepository<TimerEntity,Integer>{

}
