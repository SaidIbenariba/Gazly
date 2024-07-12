# Gas Plant Management Web Application

## Overview
This project is part of the final year studies for the Bachelor’s degree in Computer Science at the Faculty of Sciences in Rabat. The aim of this project is to design and develop a modern web application for managing a gas plant, optimizing plant operations, and integrating various user roles.

## Project Title
**Conception et Réalisation d’une Application Web pour une Usine de Gaz**

## Authors
- **Wakkar Iliass**
- **Ibenariba Said**

## Supervisors
- **Mme. Ikram Belhajem**, Professor at the Faculty of Sciences - Rabat
- **Mme. Hdioud Ferdaous**, Professor at the Faculty of Sciences - Rabat

## Table of Contents
1. [Introduction](#introduction)
2. [Project Context](#project-context)
3. [System Modeling](#system-modeling)
4. [Project Implementation](#project-implementation)
5. [Screenshots](#screenshots)
6. [Conclusion](#conclusion)
7. [Keywords](#keywords)
8. [Acknowledgements](#acknowledgements)

## Introduction
This project involves the development of a web application for managing operations in a gas plant. The application is designed to provide different functionalities based on user roles, including director, manager, and worker.

## Project Context

### Objectives
- **Optimize Management:** The main goal is to streamline the management of the gas plant operations.
- **User Role Integration:** Different user roles have access to different functionalities:
  - **Director:** Overview of all plant activities.
  - **Manager:** Daily operations management.
  - **Worker:** Access to assigned tasks and safety instructions.

### Project Phases
1. **Requirement Extraction:** Analyzing specific needs from the initial specifications.
2. **Modeling:** Defining technical specifications and user interfaces using appropriate modeling tools.
3. **Implementation:** Developing the web application with a focus on usability and security.

## System Modeling
### Sketches
### Diagrams 
#### Use Case Diagram 
![Diagrams](/client/public/usecase.jpg) 
#### Class Diagram 
![Diagrams](/client/public/class.jpg) 
#### Sequence Diagram 
![Diagrams](/client/public/sequence.jpg) 
### Technologies Used
- **Frontend:** React
- **Backend:** Node.js
- **Database:** MySQL
- **Real-Time Monitoring:** ESP32 board, MQ-2, and MQ-9 gas sensors
- **Communication:** HTTP.POST for data transmission

### Key Features
- **Assignment Management**
- **Observations and Mission Tracking**
- **Meeting Scheduling**
- **Sensor Data Monitoring**
- **Task Management**

## Project Implementation

### Development Environment
- **Hardware:** ESP32, MQ-2, MQ-9 sensors
- **Software:** Arduino, WampServer
- **Programming Languages:** C++, JavaScript (Node.js, React.js)
- **Styling:** Tailwind CSS

### Application Overview
- **Authentication:** Secure login for different user roles.
- **User Management:** Add, edit, and delete users.
- **Task and Mission Management:** Create, assign, and track tasks and missions.
- **Sensor Monitoring:** Real-time data collection and monitoring of gas levels.
- **History Tracking:** Access historical data for analysis.

## Screenshots
Here are some screenshots of the application:

### Login Page
![Login Page](/client/public/login.png)

### Dashboard
![Dashboard](/client/public/dashboard.png)

### Task Management
![Task](/client/public/tasks.png)

### Sensors 
![Sensor Monitoring](/client/public/MQ2.jpg)
#### MQ2 
![Sensors](/client/public/MQ2.jpg) 
#### MQ9 
![Sensors](/client/public/MQ9.jpg) 
#### ESP32 Montage
![Montage](/client/public/montage.jpg) 

## Conclusion
The web application developed in this project provides a robust solution for managing a gas plant, ensuring efficiency, safety, and effective communication among different user roles. Future improvements could include additional features and further optimization of the system.

## Keywords
gas, React, Node.js, MySQL, ESP32, MQ-2, MQ-9, UML

## Acknowledgements
We would like to thank our supervisor Mme. Ikram Belhajem for her guidance and support, as well as all the professors at the Faculty of Sciences, Rabat, and our families and friends for their invaluable support.
