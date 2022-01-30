package com.event_scheduler.server.controller;

import com.event_scheduler.server.dto.EventAccountDto;
import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.dto.EventWithActivitiesDto;
import com.event_scheduler.server.enums.Role;
import com.event_scheduler.server.exceptions.AccountNotFoundException;
import com.event_scheduler.server.exceptions.EventAccountNotFoundException;
import com.event_scheduler.server.exceptions.FinishDateBeforeStartException;
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

    @GetMapping("/event/{eventId}")
    Event getEvents(@PathVariable Long eventId){
        return eventService.getEvent(eventId);
    }

    @PostMapping("/addEvent/{accountId}")
    Long addEvent(@RequestBody EventDto eventDto, @PathVariable Long accountId) {
        return eventService.addEvent(eventDto, accountId);
    }

    @PostMapping("/addEventWithActivities/{accountId}")
    void addEventWithActivities(@RequestBody EventWithActivitiesDto eventWithActivitiesDto, @PathVariable Long accountId) {
        eventService.addEventWithActivities(eventWithActivitiesDto, accountId);
    }

    @PutMapping("/editEventName/{accountId}/{eventId}")
    void editEventName(@PathVariable Long accountId, @PathVariable Long eventId, @RequestBody EventDto eventDto){
        eventService.editEventName(accountId, eventId, eventDto);
    }

    @PutMapping("/editEventDescription/{accountId}/{eventId}")
    void editEventDescription(@PathVariable Long accountId, @PathVariable Long eventId, @RequestBody EventDto eventDto){
        eventService.editEventDescription(accountId, eventId, eventDto);
    }

    @DeleteMapping("/deleteEvent/{accountId}/{eventId}")
    void deleteEvent(@PathVariable Long accountId, @PathVariable Long eventId){
        eventService.removeEvent(accountId, eventId);
    }

    @PostMapping("/shareEvent/{accountId}")
    void shareEvent(@PathVariable Long accountId, @RequestBody EventAccountDto eventAccountDto){
       eventService.shareEvent(accountId, eventAccountDto);
    }

    @GetMapping("/invitedEvents/{accountId}")
    List<Event> getInvitedEvents(@PathVariable Long accountId) {
       return eventService.invitedEvents(accountId);
    }

    @PostMapping("/confirmInvitation/{accountId}/{eventId}")
    void confirmInvitation(@PathVariable Long accountId, @PathVariable Long eventId){
        eventService.confirmInvitation(accountId, eventId);
    }

    @PutMapping("/changeRole/{accountId}/manager")
    void changeRoleManager(@PathVariable Long accountId, @RequestBody EventAccountDto eventAccountDto){
        eventService.changeRole(accountId, eventAccountDto, Role.MANAGER);
    }

    @PutMapping("/changeRole/{accountId}/writer")
    void changeRoleWriter(@PathVariable Long accountId, @RequestBody EventAccountDto eventAccountDto){
        eventService.changeRole(accountId, eventAccountDto, Role.WRITER);
    }

    @GetMapping("/getRole/{accountId}/{eventId}")
    Role getRole(@PathVariable Long accountId, @PathVariable Long eventId){
        return eventService.getRole(accountId, eventId);
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

    @ExceptionHandler(FinishDateBeforeStartException.class)
    public ResponseEntity handleException(FinishDateBeforeStartException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
}
