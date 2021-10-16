package com.event_scheduler.server.controller;

import com.event_scheduler.server.dto.AccountDto;
import com.event_scheduler.server.model.Account;
import com.event_scheduler.server.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AccountsController {

    private final AccountService accountService;

    @GetMapping("/hello")
    String hello(){
        return "Hello";
    }

    @GetMapping("/accounts")
    List<Account> getAccounts(){
        return accountService.getAccounts();
    }

    @GetMapping("/account/{id}")
    Account getAccount(@PathVariable Long id){
        return accountService.getAccount(id);
    }

    @DeleteMapping("/deleteAccount/{accountId}")
    void deleteAccount(@PathVariable Long accountId){
        accountService.deleteAccount(accountId);
    }

    @PostMapping("/sign_up")
    void singUp(@RequestBody AccountDto profileDto){
        accountService.signUp(profileDto);
    }

}
