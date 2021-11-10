package com.event_scheduler.server.repository;

import com.event_scheduler.server.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Activity findActivityById(Long activityId);
}
