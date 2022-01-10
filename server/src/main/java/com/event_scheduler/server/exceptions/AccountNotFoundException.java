package com.event_scheduler.server.exceptions;

import org.springframework.http.HttpStatus;

public class AccountNotFoundException extends RuntimeException{

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public AccountNotFoundException(){
        super("Учетная запись не найдена");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
