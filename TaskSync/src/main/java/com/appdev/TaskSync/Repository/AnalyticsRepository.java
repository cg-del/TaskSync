package com.appdev.TaskSync.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.TaskSync.Entity.AnalyticsEntity;

public interface AnalyticsRepository extends JpaRepository<AnalyticsEntity, Integer>{

}
