package com.event_scheduler.server.repository;

import com.event_scheduler.server.model.EventAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EventAccountRepository extends JpaRepository<EventAccount, Long> {

    @Transactional
    void deleteByAccount_IdAndEvent_Id(Long accountId, Long eventId);

    @Transactional
    void deleteAllByAccount_Id(Long accountId);
}
