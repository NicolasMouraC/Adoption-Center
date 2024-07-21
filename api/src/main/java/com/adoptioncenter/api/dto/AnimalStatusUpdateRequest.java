package com.adoptioncenter.api.dto;

public class AnimalStatusUpdateRequest {
    private boolean status;

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}