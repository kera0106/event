package com.event_scheduler.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

import static javax.persistence.CascadeType.*;

@Entity
@Data
@Table(name="accounts")
public class Account{

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "accounts_seq")
    private Long id;

    private String login;

    @JsonIgnore
    private String password;

    private String firstname;

    private String lastname;

    @OneToMany(mappedBy = "account")
    @JsonIgnoreProperties({"account", "event.activities"})
    private List<EventAccount> eventAccounts;

}
