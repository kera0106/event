package com.event_scheduler.server.repository;

import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.model.EventAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventAccountRepository extends JpaRepository<EventAccount, Long> {

    @Transactional
    void deleteByAccount_IdAndEvent_Id(Long accountId, Long eventId);

    @Transactional
    void deleteAllByAccount_Id(Long accountId);

    Optional<EventAccount> findByAccount_IdAndEvent_Id(Long accountId, Long eventId);

    @Query("select event from Event event, EventAccount eventAccount " +
            "where eventAccount.account.id = ?1 " +
            "   and event.id = eventAccount.event.id " +
            "   and eventAccount.isAccepted = false ")
    List<Event> findInvitedEvents(Long accountId);
}
