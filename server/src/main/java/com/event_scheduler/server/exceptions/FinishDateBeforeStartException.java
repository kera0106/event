package com.event_scheduler.server.exceptions;

import org.springframework.http.HttpStatus;

public class FinishDateBeforeStartException extends RuntimeException {

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public FinishDateBeforeStartException() {
        super("Finish timestamp of activity can not be before start timestamp");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}