package com.appdev.TaskSync.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.appdev.TaskSync.Entity.TimerEntity;

public interface TimerRepository extends JpaRepository<TimerEntity, Integer> {
    List<TimerEntity> findByUser_UserId(int userId);
}