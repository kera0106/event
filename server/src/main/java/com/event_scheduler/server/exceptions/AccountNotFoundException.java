package com.event_scheduler.server.exceptions;

import org.springframework.http.HttpStatus;

public class AccountNotFoundException extends RuntimeException{

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public AccountNotFoundException(){
        super("Account not found in repository");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
