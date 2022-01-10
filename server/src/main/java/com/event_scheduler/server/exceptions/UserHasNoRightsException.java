package com.event_scheduler.server.exceptions;

import org.springframework.http.HttpStatus;

public class UserHasNoRightsException extends RuntimeException {

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public UserHasNoRightsException() {
        super("Недостаточно прав для совершения действия");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
