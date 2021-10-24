package com.event_scheduler.server.model.IdClasses;

import com.event_scheduler.server.model.Account;
import com.event_scheduler.server.model.Event;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class EventAccountId implements Serializable {
    private Long event;
    private Long account;
}
