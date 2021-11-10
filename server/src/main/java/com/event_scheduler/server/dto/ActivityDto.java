package com.event_scheduler.server.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ActivityDto {
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalDate finishDate;
    private LocalTime finishTime;
}
