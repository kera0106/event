package com.event_scheduler.server.service;

import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.exceptions.AccountNotFoundException;
import com.event_scheduler.server.model.Account;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.repository.AccountRepository;
import com.event_scheduler.server.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final AccountRepository accountRepository;

    private final AccountService accountService;

    public void addEvent(EventDto eventDto, Long accountId){
        Event event = new Event();
        event.setName(eventDto.getName());
        Account account = accountRepository.findAccountById(accountId).orElseThrow(AccountNotFoundException::new);
        event.setAccounts(new ArrayList<>());
        event.getAccounts().add(account);
        eventRepository.save(event);
    }

    public void removeEvent(Long eventId){
        eventRepository.deleteById(eventId);
    }

    public void editEvent(Long eventId, EventDto eventDto){
        Event event = eventRepository.findEventById(eventId);
        event.setName(eventDto.getName());
        eventRepository.save(event);
    }

    public List<Event> getEvents(){
        return eventRepository.findAll();
    }
}
