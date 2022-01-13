package com.event_scheduler.server.exceptions;

import org.springframework.http.HttpStatus;

public class LoginAlreadyExists extends RuntimeException{
    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public LoginAlreadyExists(){
        super("Указанный логин уже используется");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
