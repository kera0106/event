package com.event_scheduler.server.service;

import com.event_scheduler.server.dto.AccountDto;
import com.event_scheduler.server.exceptions.LoginAlreadyExists;
import com.event_scheduler.server.exceptions.AccountNotFoundException;
import com.event_scheduler.server.model.Account;
import com.event_scheduler.server.repository.AccountRepository;
import com.event_scheduler.server.repository.EventAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    private final EventAccountRepository eventAccountRepository;

    public List<Account> getAccounts(){
        return accountRepository.findAll();
    }

    public Account getAccount(Long id){
        return accountRepository.findAccountById(id).orElseThrow(AccountNotFoundException::new);
    }

    public Account signUp(AccountDto profileDto){
        if(accountRepository.findAccountByLogin(profileDto.getLogin()).isPresent()){
            throw new LoginAlreadyExists();
        }
        Account profile = new Account();
        profile.setLogin(profileDto.getLogin());
        profile.setPassword(profileDto.getPassword());
        profile.setFirstname(profileDto.getFirstname());
        profile.setLastname(profileDto.getLastname());
        return accountRepository.save(profile);
    }

    public void deleteAccount(Long accountId){
        eventAccountRepository.deleteAllByAccount_Id(accountId);
        accountRepository.deleteById(accountId);
    }

    public void editAccountName(Long accountId, AccountDto profileDto){
        Account account = accountRepository.findAccountById(accountId).orElseThrow(AccountNotFoundException::new);
        Optional<Account> accountOptional = accountRepository.findAccountByLogin(profileDto.getLogin());
        boolean isLoginAlreadyExists = accountOptional.filter(accountWithLogin -> accountWithLogin.getId() != accountId).isPresent();
        if(isLoginAlreadyExists){
            throw new LoginAlreadyExists();
        }
        account.setLogin(profileDto.getLogin());
        account.setFirstname(profileDto.getFirstname());
        account.setLastname(profileDto.getLastname());
        accountRepository.save(account);
    }

    public boolean isLoginExists(Long accountId, String login){
        Optional<Account> accountOptional = accountRepository.findAccountByLogin(login);
        return accountOptional.filter(account -> account.getId() != accountId).isPresent();
    }

}
