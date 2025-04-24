package com.carservicemanager.carservicemanager.exceptions;

public class PlateIsAlreadyException extends RuntimeException {
    public PlateIsAlreadyException(String message) {
        super(message);
    }
}
