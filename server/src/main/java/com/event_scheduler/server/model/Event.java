package com.event_scheduler.server.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "events_seq")
    private Long id;

    private String name;
}
