package com.event_scheduler.server.controller;

import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventsController {

    private final EventService eventService;

    @GetMapping("/events")
    List<Event> getEvents(){
        return eventService.getEvents();
    }

    @PostMapping("/addEvent")
    void addEvent(@RequestBody EventDto eventDto) {
        eventService.addEvent(eventDto);
    }
}
