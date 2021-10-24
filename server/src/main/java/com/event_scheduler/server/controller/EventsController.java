package com.event_scheduler.server.controller;

import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.exceptions.AccountNotFoundException;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/deleteEvent/{accountId}/{eventId}")
    void deleteEvent(@PathVariable Long accountId, @PathVariable Long eventId){
        eventService.removeEvent(accountId, eventId);
    }

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity handleException(AccountNotFoundException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
}
