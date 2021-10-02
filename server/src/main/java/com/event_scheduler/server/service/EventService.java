package com.event_scheduler.server.service;

import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public void addEvent(EventDto eventDto){
        Event event = new Event();
        event.setName(eventDto.getName());
        eventRepository.save(event);
    }

    public List<Event> getEvents(){
        return eventRepository.findAll();
    }
}
