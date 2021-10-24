package com.event_scheduler.server.model.IdClasses;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class EventAccountId implements Serializable {
    private Long event;
    private Long account;
}
