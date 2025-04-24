FROM openjdk:17-jdk-slim

LABEL authors="omerbalci"

# Set working directory
WORKDIR /app

# Copy the JAR file from target directory
COPY target/carservicemanager-0.0.1-SNAPSHOT.jar app.jar

# Expose the port
EXPOSE 8083

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
