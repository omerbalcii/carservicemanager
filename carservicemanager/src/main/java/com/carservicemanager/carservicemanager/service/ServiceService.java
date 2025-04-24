package com.carservicemanager.carservicemanager.service;

import com.carservicemanager.carservicemanager.domain.Car;
import com.carservicemanager.carservicemanager.domain.Service;
import com.carservicemanager.carservicemanager.dtos.PagedResponse;
import com.carservicemanager.carservicemanager.enums.ServiceStatus;
import com.carservicemanager.carservicemanager.repository.ServiceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public PagedResponse<Service> findAllService(int page, int pageSize) {
        int pageNumber = page; // Burada doğrudan page'i alıyoruz çünkü Spring Data JPA PageRequest'te sayfa numarası 0'dan başlar
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Service> pageResult = serviceRepository.findAll(pageable);

        return new PagedResponse<>(pageResult.getTotalElements(), pageResult.getContent());
    }
    public Optional<Service> findById(Long id){
        return serviceRepository.findById(id);
    }
    public Service createService(Service service) {
        service.setCreatedAt(LocalDateTime.now()); // Şu anki tarih
        return serviceRepository.save(service);
    }


    public Service updateService(Long id, Service serviceDetails) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Service not found with id: " + id));

        service.setDescription(serviceDetails.getDescription());
        service.setTitle(serviceDetails.getTitle());
        service.setStatus(serviceDetails.getStatus());

        return serviceRepository.save(service);}

    public List<Service> getServicesByCarIdAndStatus(Long carId, ServiceStatus status) {
        if (carId != null && status != null) {
            return serviceRepository.findByCarIdAndStatus(carId, status);
        }
        return getServicesByCarIdOrStatus(carId, status);
    }

    private List<Service> getServicesByCarIdOrStatus(Long carId, ServiceStatus status) {
        if (carId != null) {
            return serviceRepository.findByCarId(carId);
        }
        if (status != null) {
            return serviceRepository.findByStatus(status);
        }
        return Collections.emptyList();
    }
}
