package com.event_scheduler.server.service;

import com.event_scheduler.server.dto.EventAccountDto;
import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.enums.Role;
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
        eventAccount.setManager(true);
        eventAccount.setWriter(true);
        eventAccountRepository.save(eventAccount);
    }

    public void removeEvent(Long accountId, Long eventId){
        eventAccountRepository.deleteByAccount_IdAndEvent_Id(accountId, eventId);
    }

    public void editEvent(Long accountId, Long eventId, EventDto eventDto){
        if (!checkRole(accountId, eventId, Role.WRITER))
            throw new UserHasNoRightsException();
        Event event = eventRepository.findEventById(eventId);
        event.setName(eventDto.getName());
        eventRepository.save(event);
    }

    public void shareEvent(Long accountId, EventAccountDto eventAccountDto){
        Role role = getRole(accountId, eventAccountDto.getEventId());
        if (!(role == Role.MANAGER || role == Role.AUTHOR))
            throw new UserHasNoRightsException();
        Account account = accountRepository.findAccountById(eventAccountDto.getAccountId()).orElseThrow(AccountNotFoundException::new);
        Event event = eventRepository.findEventById(eventAccountDto.getEventId());
        EventAccount eventAccount = new EventAccount();
        eventAccount.setAccount(account);
        eventAccount.setEvent(event);
        eventAccountRepository.save(eventAccount);
    }

    public void changeRole(Long accountId, EventAccountDto eventAccountDto, Role role){
        if (!checkRole(accountId, eventAccountDto.getEventId(), Role.AUTHOR))
            throw new UserHasNoRightsException();
        setRole(eventAccountDto.getAccountId(), eventAccountDto.getEventId(), role, eventAccountDto.isRole());
    }

    public List<Event> getEvents(){
        return eventRepository.findAll();
    }

    private void setRole(Long accountId, Long eventId, Role role, boolean value){
        EventAccount eventAccount = eventAccountRepository.findByAccount_IdAndEvent_Id(accountId, eventId).orElseThrow(EventAccountNotFoundException::new);
        if (role == Role.MANAGER) {
            eventAccount.setManager(value);
        }
        else if (role == Role.WRITER) {
            eventAccount.setWriter(value);
        }
        eventAccountRepository.save(eventAccount);
    }

    private boolean checkRole(Long accountId, Long eventId, Role role){
        EventAccount eventAccount = eventAccountRepository.findByAccount_IdAndEvent_Id(accountId, eventId).orElseThrow(EventAccountNotFoundException::new);
        boolean isRole = false;
        if (role == Role.MANAGER){
            isRole = eventAccount.isManager();
        }
        else if (role == Role.WRITER){
            isRole = eventAccount.isWriter();
        }
        return isRole;
    }

    public Role getRole(Long accountId, Long eventId){
        EventAccount eventAccount = eventAccountRepository.findByAccount_IdAndEvent_Id(accountId, eventId).orElseThrow(EventAccountNotFoundException::new);
        Role role = Role.READER;
        if (eventAccount.isAuthor()) {
            role = Role.AUTHOR;
        }
        else if (eventAccount.isManager()){
            role = Role.MANAGER;
        }
        else if (eventAccount.isWriter()){
            role = Role.WRITER;
        }
        return role;
    }
}
