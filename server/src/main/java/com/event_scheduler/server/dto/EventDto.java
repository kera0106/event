package com.event_scheduler.server.dto;

import com.event_scheduler.server.model.Account;
import lombok.Data;

import java.util.List;

@Data
public class EventDto {
    private Long id;
    private String name;
    private List<Account> accounts;
}
