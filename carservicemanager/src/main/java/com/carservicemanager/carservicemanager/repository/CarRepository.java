package com.carservicemanager.carservicemanager.repository;

import com.carservicemanager.carservicemanager.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    public Car findByLicensePlate(String licensePlate);
}
