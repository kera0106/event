package com.event_scheduler.server.model.IdClasses;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class InvitationId implements Serializable {
    private Long fromId;
    private Long toId;
    private Long eventId;
}
