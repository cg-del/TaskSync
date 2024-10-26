package com.appdev.TaskSync.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.TaskSync.Entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer>{

}
