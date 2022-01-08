package com.event_scheduler.server.dto;

import lombok.Data;

@Data
public class AccountDto {
    private String login;
    private String password;
    private String firstname;
    private String lastname;
}
