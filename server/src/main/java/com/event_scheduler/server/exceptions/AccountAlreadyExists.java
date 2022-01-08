package com.event_scheduler.server.exceptions;

import org.springframework.http.HttpStatus;

public class AccountAlreadyExists extends RuntimeException{
    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public AccountAlreadyExists(){
        super("Account with entered login already exists");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
