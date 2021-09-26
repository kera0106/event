package com.event_scheduler.server.model;

import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@Table(name="accounts")
public class Account {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "accounts_seq")
    private Long id;

    private String login;

    private String password;

}
