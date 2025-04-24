package com.carservicemanager.carservicemanager.controller;

import com.carservicemanager.carservicemanager.domain.Car;
import com.carservicemanager.carservicemanager.dtos.PagedResponse;
import com.carservicemanager.carservicemanager.exceptions.PlateIsAlreadyException;
import com.carservicemanager.carservicemanager.repository.CarRepository;
import com.carservicemanager.carservicemanager.service.CarService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;
    private final CarRepository carRepository;

    @Autowired
    public CarController(CarService carService,CarRepository carRepository) {
        this.carService = carService;
        this.carRepository= carRepository;
    }

    @GetMapping(path = "getall", produces = MediaType.APPLICATION_JSON_VALUE)
    public PagedResponse<Car> getAllCarsPaged(@RequestParam int page, @RequestParam int pageSize) {
        return carService.findAllCars(page, pageSize); // Servise yönlendiriyoruz
    }


    @PostMapping(path = "save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody Car car) {
        try {
            Car savedCar = carService.createCar(car);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCar);
        } catch (PlateIsAlreadyException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("message", e.getMessage())
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of("message", "Bilinmeyen bir hata oluştu.")
            );
        }
    }

    @PutMapping(value = "update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Car> updateCar(@PathVariable long id, @RequestBody Car carDetails) {
        try {
            // CarService üzerinden güncelleme işlemi
            Car updatedCar = carService.updateCar(id, carDetails);
            return ResponseEntity.ok(updatedCar);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Optional<Car> car = carService.findById(id);
        return car.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    @GetMapping(path = "getallNonPaged", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Car> getAllCarsNonPaged() {
        return carService.findAllCars();
    }
    @GetMapping("getByPlate")
    public ResponseEntity<Car> getCarByPlate(@RequestParam String plate) {
        Car car = carRepository.findByLicensePlate(plate);
        if (car != null) {
            return ResponseEntity.ok(car);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
