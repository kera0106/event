package com.event_scheduler.server.exceptions;

import org.springframework.http.HttpStatus;

public class UserHasNoRightsException extends RuntimeException {

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public UserHasNoRightsException() {
        super("User is not authorized for this action");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
