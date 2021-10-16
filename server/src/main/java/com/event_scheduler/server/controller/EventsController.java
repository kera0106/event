package com.event_scheduler.server.controller;

import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventsController {

    private final EventService eventService;

    @GetMapping("/events")
    List<Event> getEvents(){
        return eventService.getEvents();
    }

    @PostMapping("/addEvent/{accountId}")
    void addEvent(@RequestBody EventDto eventDto, @PathVariable Long accountId) {
        eventService.addEvent(eventDto, accountId);
    }

    @PutMapping("/editEvent/{eventId}")
    void editEvent(@PathVariable Long eventId, @RequestBody EventDto eventDto){
        eventService.editEvent(eventId, eventDto);
    }

    @DeleteMapping("/deleteEvent/{eventId}")
    void deleteEvent(@PathVariable Long eventId){
        eventService.removeEvent(eventId);
    }
}
