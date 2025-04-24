package com.carservicemanager.carservicemanager.domain;

import com.carservicemanager.carservicemanager.enums.ServiceStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "service_id_seq")
    @SequenceGenerator(name = "service_id_seq", sequenceName = "service_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ServiceStatus status = ServiceStatus.PENDING;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Car car;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ServiceStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }
}
