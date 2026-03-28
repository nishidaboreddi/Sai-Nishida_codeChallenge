package com.hexaware.cricketTeamManagementSystem.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice

public class GlobalExceptionHandler {

    @ExceptionHandler(PlayerNotFoundException.class)

    public ResponseEntity<String> handlePlayerNotFound(PlayerNotFoundException ex) {

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}