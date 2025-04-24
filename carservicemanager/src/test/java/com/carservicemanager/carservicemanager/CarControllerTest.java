package com.carservicemanager.carservicemanager;
import com.carservicemanager.carservicemanager.domain.Car;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@DirtiesContext
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
@DisplayName("Tüm Car API entegrasyon testleri")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CarControllerTest {

    @Test
    @DisplayName("Car getById testi")
    @Order(1)
    void testGetCarById() {
        RestTemplate template = new RestTemplate();
        String url = "http://localhost:8083/api/cars/findById/{id}";

        HashMap<String, Object> uriVariables = new HashMap<>();
        uriVariables.put("id", 1);

        ResponseEntity<Car> response = template.getForEntity(url, Car.class, uriVariables);

        Car expectedCar = new Car(1L, "34ABP123", "Corolla", "Toyota");
        Assertions.assertEquals(expectedCar, response.getBody(), "Gelen araba bilgisi beklenenle eşleşmiyor!");
    }
}
