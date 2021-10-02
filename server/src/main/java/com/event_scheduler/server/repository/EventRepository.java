package com.event_scheduler.server.repository;

import com.event_scheduler.server.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}
