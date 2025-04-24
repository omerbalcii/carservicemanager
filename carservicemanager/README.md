
# Car Service Manager

Bu proje, araç servisi yönetimi için bir backend uygulamasıdır. Spring Boot kullanılarak geliştirilmiş ve Docker ile containerize edilmiştir.

## Başlangıç

### Gereksinimler

- **Java 17** 
- **Docker** ve **Docker Compose** yüklü olmalıdır.

### Projeyi Çalıştırma

#### Docker ile Çalıştırma

1. Proje dizinine gidin.
   
2. Aşağıdaki komutla Docker Compose'u başlatın:
   
   ```bash
   docker-compose up --build
   ```

   Bu komut, Docker'ı kullanarak uygulamanızı ve veritabanını başlatacaktır. Uygulama **8083 portunda** çalışmaya başlayacaktır.

#### Yerel Ortamda Çalıştırma (Docker Olmadan)

1. Git deposunu klonlayın:

   ```bash
   git clone <repository-url>
   cd carservicemanager
   ```

2. Bağımlılıkları yükleyin ve uygulamayı başlatın:

   - Maven ile:
     
     ```bash
     mvn clean install
     mvn spring-boot:run
     ```

   
   Uygulama **8083 portunda** çalışmaya başlayacaktır.

### Veritabanı Yapılandırması

Proje, **MySQL** veritabanını kullanmaktadır. Docker içinde MySQL başlatılacaktır. Bağlantı bilgileri:

- **Veritabanı Adı:** carservicemanager
- **Kullanıcı Adı:** root
- **Şifre:** 1234
- **Port:** 3306

Veritabanı bağlantı ayarlarını **`application.properties`** dosyasından değiştirebilirsiniz.

### Port Yapılandırması

Varsayılan olarak, backend uygulamanız **8083 portunda** çalışacaktır. Eğer bu port başka bir uygulama tarafından kullanılıyorsa, `application.properties` dosyasındaki `server.port` ayarını değiştirerek başka bir port belirleyebilirsiniz:

```properties
server.port=8084
```

## Proje Yapısı

- **src/main/java**: Java kaynak dosyaları.
- **src/main/resources**: Konfigürasyon dosyaları.
- **target**: Derlenmiş `.jar` dosyası.

---

## Docker Compose Yapılandırması

**docker-compose.yml** dosyasındaki temel yapılandırmalar:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8
    container_name: mysql-carservice
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 1234
      MYSQL_DATABASE: carservicemanager
      MYSQL_USER: root
      MYSQL_PASSWORD: 1234
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: carservicemanagement
    restart: on-failure
    depends_on:
      - mysql
    ports:
      - "8083:8083"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/carservicemanager
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: 1234
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
      SERVER_PORT: 8083

volumes:
  mysql-data:
```

---
Frontend için

Araba kaydet,Arabalar,Servis,Servis Kaydet işlemleri bulunmaktadır.

kurulmalı
node 

npm install react react-dom
npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install axios
npm install @mui/icons-material

Araba Kaydederken Plaka Kontrolü yapılır ,
arabalardan detay dediğimizde kayıtlı servisler görüntülenir


