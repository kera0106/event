package com.event_scheduler.server.repository;

import com.event_scheduler.server.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    List<Invitation> findAllByToId(Long accountId);

    @Transactional
    void deleteByToIdAndEventId(Long toId, Long eventId);

}
