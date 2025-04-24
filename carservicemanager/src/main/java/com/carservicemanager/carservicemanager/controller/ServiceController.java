package com.carservicemanager.carservicemanager.controller;

import com.carservicemanager.carservicemanager.domain.Car;
import com.carservicemanager.carservicemanager.dtos.PagedResponse;
import com.carservicemanager.carservicemanager.domain.Service;
import com.carservicemanager.carservicemanager.enums.ServiceStatus;
import com.carservicemanager.carservicemanager.service.ServiceService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceService serviceService;

    @Autowired
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping(path = "getall", produces = MediaType.APPLICATION_JSON_VALUE)
    public PagedResponse<Service> getAllCars(@RequestParam int page, @RequestParam int pageSize) {
        return serviceService.findAllService(page, pageSize);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        Optional<Service> service = serviceService.findById(id);
        return service.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping(path = "save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Service> saveService(@RequestBody Service service) {
        try {
            Service savedService = serviceService.createService(service);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedService);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Service> updateService(@PathVariable long id, @RequestBody Service serviceDetails) {
        try {
            Service updatedService = serviceService.updateService(id, serviceDetails);
            return ResponseEntity.ok(updatedService);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("filter")
    public ResponseEntity<?> getServicesByCarIdAndStatus(
            @RequestParam(required = false) Long carId,
            @RequestParam(required = false) ServiceStatus status) {

        List<Service> services = serviceService.getServicesByCarIdAndStatus(carId, status);

        return ResponseEntity.ok(services);
    }
}