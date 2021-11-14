package com.event_scheduler.server.model;

import com.event_scheduler.server.model.IdClasses.EventAccountId;
import com.event_scheduler.server.model.IdClasses.InvitationId;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Data
@Entity
@Table(name="invitations")
@IdClass(InvitationId.class)
public class Invitation {

    @Id
    private Long fromId;

    @Id
    private Long toId;

    @Id
    private Long eventId;
}
