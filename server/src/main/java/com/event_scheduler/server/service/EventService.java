package com.event_scheduler.server.service;

import com.event_scheduler.server.dto.EventAccountDto;
import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.exceptions.AccountNotFoundException;
import com.event_scheduler.server.exceptions.EventAccountNotFoundException;
import com.event_scheduler.server.exceptions.UserHasNoRightsException;
import com.event_scheduler.server.model.Account;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.model.EventAccount;
import com.event_scheduler.server.repository.AccountRepository;
import com.event_scheduler.server.repository.EventAccountRepository;
import com.event_scheduler.server.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final AccountRepository accountRepository;

    private final EventAccountRepository eventAccountRepository;

    @Transactional
    public void addEvent(EventDto eventDto, Long accountId){
        Event event = new Event();
        event.setName(eventDto.getName());
        eventRepository.save(event);
        Account account = accountRepository.findAccountById(accountId).orElseThrow(AccountNotFoundException::new);
        EventAccount eventAccount = new EventAccount();
        eventAccount.setAccount(account);
        eventAccount.setEvent(event);
        eventAccount.setAuthor(true);
        eventAccountRepository.save(eventAccount);
    }

    public void removeEvent(Long accountId, Long eventId){
        eventAccountRepository.deleteByAccount_IdAndEvent_Id(accountId, eventId);
    }

    public void editEvent(Long eventId, EventDto eventDto){
        Event event = eventRepository.findEventById(eventId);
        event.setName(eventDto.getName());
        eventRepository.save(event);
    }

    public void shareEvent(Long accountId, EventAccountDto eventAccountDto){
        EventAccount eventAccount = eventAccountRepository.findByAccount_IdAndEvent_Id(accountId, eventAccountDto.getEventId()).orElseThrow(EventAccountNotFoundException::new);
        if (!eventAccount.isAuthor())
            throw new UserHasNoRightsException();
        Account account = accountRepository.findAccountById(eventAccountDto.getAccountId()).orElseThrow(AccountNotFoundException::new);
        Event event = eventRepository.findEventById(eventAccountDto.getEventId());
        eventAccount = new EventAccount();
        eventAccount.setAccount(account);
        eventAccount.setEvent(event);
        eventAccount.setAuthor(eventAccountDto.isAuthor());
        eventAccountRepository.save(eventAccount);
    }

    public void changeRole(Long accountId, EventAccountDto eventAccountDto){
        EventAccount eventAccount = eventAccountRepository.findByAccount_IdAndEvent_Id(accountId, eventAccountDto.getEventId()).orElseThrow(EventAccountNotFoundException::new);
        if (!eventAccount.isAuthor())
            throw new UserHasNoRightsException();
        eventAccount = eventAccountRepository.findByAccount_IdAndEvent_Id(eventAccountDto.getAccountId(), eventAccountDto.getEventId()).orElseThrow(EventAccountNotFoundException::new);
        System.out.println(eventAccountDto.isAuthor());
        eventAccount.setAuthor(eventAccountDto.isAuthor());
        eventAccountRepository.save(eventAccount);
    }

    public List<Event> getEvents(){
        return eventRepository.findAll();
    }
}
