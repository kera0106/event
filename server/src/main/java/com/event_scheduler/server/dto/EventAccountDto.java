package com.event_scheduler.server.dto;

import lombok.Data;

@Data
public class EventAccountDto {
    private Long accountId;
    private Long eventId;
    private boolean author;
}
