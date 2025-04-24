package com.carservicemanager.carservicemanager.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "car_id_seq")
    @SequenceGenerator(name = "car_id_seq", sequenceName = "car_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "license_plate", nullable = false ,length = 15, unique = true)
    private String licensePlate;

    @Column(name = "model", nullable = false ,length = 50)
    private String model;

    @Column(name = "brand", nullable = false ,length = 50)
    private String brand;

    public Car() {
    }

    public Car(Long id, String licensePlate, String model, String brand) {
        this.id = id;
        this.licensePlate = licensePlate;
        this.model = model;
        this.brand = brand;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Objects.equals(id, car.id) && Objects.equals(licensePlate, car.licensePlate) && Objects.equals(model, car.model) && Objects.equals(brand, car.brand);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, licensePlate, model, brand);
    }
}
