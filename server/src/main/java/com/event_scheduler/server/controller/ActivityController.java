package com.event_scheduler.server.controller;

import com.event_scheduler.server.dto.ActivityDto;
import com.event_scheduler.server.exceptions.FinishDateBeforeStartException;
import com.event_scheduler.server.exceptions.UserHasNoRightsException;
import com.event_scheduler.server.model.Activity;
import com.event_scheduler.server.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("/addActivity/{eventId}")
    void addActivity(@PathVariable Long eventId, @RequestBody List<ActivityDto> activityDtos) {
        activityService.addActivity(eventId, activityDtos);
    }

    @PutMapping("/editActivityName/{accountId}/{eventId}/{activityId}")
    void editActivityName(@PathVariable Long accountId, @PathVariable Long eventId, @PathVariable Long activityId, @RequestBody ActivityDto activityDto){
        activityService.editActivityName(accountId, eventId, activityId, activityDto);
    }

    @PutMapping("/editActivityDescription/{accountId}/{eventId}/{activityId}")
    void editActivityDescription(@PathVariable Long accountId, @PathVariable Long eventId, @PathVariable Long activityId, @RequestBody ActivityDto activityDto){
        activityService.editActivityDescription(accountId, eventId, activityId, activityDto);
    }

    @PutMapping("/editActivityStart/{accountId}/{eventId}/{activityId}")
    void editActivityStart(@PathVariable Long accountId, @PathVariable Long eventId, @PathVariable Long activityId, @RequestBody ActivityDto activityDto){
        activityService.editActivityStart(accountId, eventId, activityId, activityDto);
    }

    @PutMapping("/editActivityFinish/{accountId}/{eventId}/{activityId}")
    void editActivityFinish(@PathVariable Long accountId, @PathVariable Long eventId, @PathVariable Long activityId, @RequestBody ActivityDto activityDto){
        activityService.editActivityFinish(accountId, eventId, activityId, activityDto);
    }

    @DeleteMapping("/deleteActivity/{accountId}/{eventId}/{activityId}")
    void deleteActivity(@PathVariable Long accountId, @PathVariable Long eventId, @PathVariable Long activityId){
        activityService.removeActivity(accountId, eventId, activityId);
    }

    @GetMapping("/activitiesAtDay/{accountId}/{day}")
    List<Activity> getActivitiesAtDay(@PathVariable Long accountId, @PathVariable String day){
        return activityService.getActivitiesAtDay(accountId, LocalDate.parse(day));
    }

    @PostMapping("/conflictActivities/{accountId}")
    List<Activity> getConflictActivities(@PathVariable Long accountId, @RequestBody List<ActivityDto> activityDtos){
        return activityService.getConflictActivities(accountId, activityDtos);
    }

    @GetMapping("/activities")
    List<Activity> getActivities() {
        return activityService.getActivities();
    }

    @ExceptionHandler(FinishDateBeforeStartException.class)
    public ResponseEntity handleException(FinishDateBeforeStartException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }

    @ExceptionHandler(UserHasNoRightsException.class)
    public ResponseEntity handleException(UserHasNoRightsException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
}
