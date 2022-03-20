package com.event_scheduler.server.repository;

import com.event_scheduler.server.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findEventById(Long id);

    void deleteEventById(Long id);

}
