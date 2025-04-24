package com.carservicemanager.carservicemanager.service;

import com.carservicemanager.carservicemanager.domain.Car;
import com.carservicemanager.carservicemanager.dtos.PagedResponse;
import com.carservicemanager.carservicemanager.exceptions.PlateIsAlreadyException;
import com.carservicemanager.carservicemanager.repository.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }
    public Optional<Car> findById(Long id){
        return carRepository.findById(id);
    }

    public PagedResponse<Car> findAllCars(int page, int pageSize) {
        int pageNumber = page; // Burada doğrudan page'i alıyoruz çünkü Spring Data JPA PageRequest'te sayfa numarası 0'dan başlar
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Car> pageResult = carRepository.findAll(pageable);

        return new PagedResponse<>(pageResult.getTotalElements(), pageResult.getContent());
    }

    @Transactional
    public Car createCar(Car car) {
        if (carRepository.findByLicensePlate(car.getLicensePlate()) != null) {
            throw new PlateIsAlreadyException("License plate " + car.getLicensePlate() + " already exists.");
        }
        return carRepository.save(car);
    }
    @Transactional
    public Car updateCar(Long id, Car carDetails) {
        Car carToUpdate = carRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Car not found with id: " + id));

        carToUpdate.setLicensePlate(carDetails.getLicensePlate());
        carToUpdate.setModel(carDetails.getModel());
        carToUpdate.setBrand(carDetails.getBrand());

        return carRepository.save(carToUpdate);
    }
    public List<Car> findAllCars() {
        return carRepository.findAll();
    }}