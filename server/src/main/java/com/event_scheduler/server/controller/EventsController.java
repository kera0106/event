package com.event_scheduler.server.controller;

import com.event_scheduler.server.dto.EventAccountDto;
import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.exceptions.AccountNotFoundException;
import com.event_scheduler.server.exceptions.EventAccountNotFoundException;
import com.event_scheduler.server.exceptions.UserHasNoRightsException;
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

    @PostMapping("/shareEvent/{accountId}")
    void shareEvent(@PathVariable Long accountId, @RequestBody EventAccountDto eventAccountDto){
        eventService.shareEvent(accountId, eventAccountDto);
    }

    @PutMapping("/changeRole/{accountId}")
    void changeRole(@PathVariable Long accountId, @RequestBody EventAccountDto eventAccountDto){
        System.out.println(eventAccountDto.isAuthor());
        eventService.changeRole(accountId, eventAccountDto);
    }


    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity handleException(AccountNotFoundException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }

    @ExceptionHandler(EventAccountNotFoundException.class)
    public ResponseEntity handleException(EventAccountNotFoundException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }

    @ExceptionHandler(UserHasNoRightsException.class)
    public ResponseEntity handleException(UserHasNoRightsException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
}
