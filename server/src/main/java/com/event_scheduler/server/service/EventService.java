package com.event_scheduler.server.service;

import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.model.Account;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final AccountService accountService;

    public void addEvent(EventDto eventDto, Long accountId){
        Event event = new Event();
        event.setName(eventDto.getName());
        event = eventRepository.save(event);
        accountService.addEvent(event, accountId);
    }

    public void removeEvent(Long accountId){
        eventRepository.deleteById(accountId);
    }

    public List<Event> getEvents(){
        return eventRepository.findAll();
    }
}
