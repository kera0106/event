package com.event_scheduler.server.model;

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

    private String password;

    @OneToMany(mappedBy = "account")
    private List<EventAccount> eventAccounts;

}
