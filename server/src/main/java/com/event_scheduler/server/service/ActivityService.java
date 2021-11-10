package com.event_scheduler.server.service;

import com.event_scheduler.server.dto.ActivityDto;
import com.event_scheduler.server.dto.EventDto;
import com.event_scheduler.server.enums.Role;
import com.event_scheduler.server.exceptions.EventAccountNotFoundException;
import com.event_scheduler.server.exceptions.UserHasNoRightsException;
import com.event_scheduler.server.model.Activity;
import com.event_scheduler.server.model.Event;
import com.event_scheduler.server.model.EventAccount;
import com.event_scheduler.server.repository.ActivityRepository;
import com.event_scheduler.server.repository.EventAccountRepository;
import com.event_scheduler.server.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    private final EventRepository eventRepository;

    private final EventAccountRepository eventAccountRepository;

    public void addActivity(Long eventId, List<ActivityDto> activityDtos){
        Event event = eventRepository.findEventById(eventId);
        List<Activity> activities = new ArrayList<>();
        activityDtos.forEach((activityDto -> {
            Activity activity = new Activity();
            activity.setEvent(event);
            activity.setName(activityDto.getName());
            activity.setDescription(activityDto.getDescription());
            activity.setStart(LocalDateTime.of(activityDto.getStartDate(), activityDto.getStartTime()));
            activity.setFinish(LocalDateTime.of(activityDto.getFinishDate(), activityDto.getFinishTime()));
            activities.add(activity);
        }));
        activityRepository.saveAll(activities);
    }

    public void editActivityName(Long accountId, Long eventId, Long activityId, ActivityDto activityDto){
        if (!checkRole(accountId, eventId, Role.WRITER))
            throw new UserHasNoRightsException();
        Activity activity = activityRepository.findActivityById(activityId);
        activity.setName(activityDto.getName());
        activityRepository.save(activity);
    }

    public void editActivityDescription(Long accountId, Long eventId, Long activityId, ActivityDto activityDto){
        if (!checkRole(accountId, eventId, Role.WRITER))
            throw new UserHasNoRightsException();
        Activity activity = activityRepository.findActivityById(activityId);
        activity.setDescription(activityDto.getDescription());
        activityRepository.save(activity);
    }

    public void editActivityStart(Long accountId, Long eventId, Long activityId, ActivityDto activityDto){
        if (!checkRole(accountId, eventId, Role.WRITER))
            throw new UserHasNoRightsException();
        Activity activity = activityRepository.findActivityById(activityId);
        activity.setStart(LocalDateTime.of(activityDto.getStartDate(), activityDto.getStartTime()));
        activityRepository.save(activity);
    }

    public void editActivityFinish(Long accountId, Long eventId, Long activityId, ActivityDto activityDto){
        if (!checkRole(accountId, eventId, Role.WRITER))
            throw new UserHasNoRightsException();
        Activity activity = activityRepository.findActivityById(activityId);
        activity.setFinish(LocalDateTime.of(activityDto.getFinishDate(), activityDto.getFinishTime()));
        activityRepository.save(activity);
    }

    public void removeActivity(Long accountId, Long eventId, Long activityId){
        if (!checkRole(accountId, eventId, Role.WRITER))
            throw new UserHasNoRightsException();
        activityRepository.deleteById(activityId);
    }

    private boolean checkRole(Long accountId, Long eventId, Role role){
        EventAccount eventAccount = eventAccountRepository.findByAccount_IdAndEvent_Id(accountId, eventId).orElseThrow(EventAccountNotFoundException::new);
        boolean isRole = false;
        if (role == Role.MANAGER){
            isRole = eventAccount.isManager();
        }
        else if (role == Role.WRITER){
            isRole = eventAccount.isWriter();
        }
        return isRole;
    }

    public List<Activity> getActivities(){
        return activityRepository.findAll();
    }
}
