package com.event_scheduler.server.exceptions;

import org.springframework.http.HttpStatus;

public class EventAccountNotFoundException extends RuntimeException{

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public EventAccountNotFoundException(){
        super("Note event-account not found in repository");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
