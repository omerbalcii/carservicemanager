package com.carservicemanager.carservicemanager.repository;

import com.carservicemanager.carservicemanager.domain.Service;
import com.carservicemanager.carservicemanager.enums.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByCarIdAndStatus(Long carId, ServiceStatus status); // AND ile filtreleme

    List<Service> findByCarId(Long carId);

    List<Service> findByStatus(ServiceStatus status);
}