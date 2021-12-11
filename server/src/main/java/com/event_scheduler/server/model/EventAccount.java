package com.event_scheduler.server.model;

import com.event_scheduler.server.model.IdClasses.EventAccountId;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name="events_accounts")
@IdClass(EventAccountId.class)
public class EventAccount implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "event_id")
    @JsonIgnoreProperties("eventAccounts")
    private Event event;

    @Id
    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonIgnoreProperties("eventAccounts")
    private Account account;

    private boolean isAuthor;

    private boolean isManager;

    private boolean isWriter;

    private boolean isAccepted;
}
