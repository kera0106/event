package com.event_scheduler.server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name="events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "events_seq")
    private Long id;

    private String name;

    @ManyToMany
    @JsonIgnoreProperties("events")
    private List<Account> accounts;
}
