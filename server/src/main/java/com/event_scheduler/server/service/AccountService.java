package com.event_scheduler.server.service;

import com.event_scheduler.server.dto.AccountDto;
import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.exceptions.AccountNotFoundException;
import com.event_scheduler.server.model.Account;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public List<Account> getAccounts(){
        return accountRepository.findAll();
    }

    public Account getAccount(Long id){
        return accountRepository.findAccountById(id).orElseThrow(AccountNotFoundException::new);
    }

    public Account signUp(AccountDto profileDto){
        Account profile = new Account();
        profile.setLogin(profileDto.getLogin());
        profile.setPassword(profileDto.getPassword());
        return accountRepository.save(profile);
    }

    public void deleteAccount(Long accountId){
        accountRepository.deleteById(accountId);
    }

}
