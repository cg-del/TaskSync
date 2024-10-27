package com.appdev.TaskSync.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.TaskSync.Entity.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity,Integer>{

}
