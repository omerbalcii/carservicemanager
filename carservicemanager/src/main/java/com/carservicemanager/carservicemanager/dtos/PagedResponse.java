package com.carservicemanager.carservicemanager.dtos;

import java.util.List;

public class PagedResponse<ResponseObject>{
    private Long totalCount;
    private List<ResponseObject> items;

    public PagedResponse(Long totalCount, List<ResponseObject> items) {
        this.totalCount = totalCount;
        this.items = items;
    }

    public Long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Long totalCount) {
        this.totalCount = totalCount;
    }

    public List<ResponseObject> getItems() {
        return items;
    }

    public void setItems(List<ResponseObject> items) {
        this.items = items;
    }
}
