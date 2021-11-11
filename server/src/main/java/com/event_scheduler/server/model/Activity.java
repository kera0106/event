package com.event_scheduler.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name="activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "activity_seq")
    private Long id;

    private String name;

    private String description;

    private LocalDateTime start;

    private LocalDateTime finish;

    @ManyToOne()
    @JoinColumn(name="event_id")
    @JsonIgnore
    private Event event;

}
