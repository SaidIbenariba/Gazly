import React from "react";
import Navbar from "../components/Home/Navbar";
import { Card, Typography } from "@material-tailwind/react";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  return (
    <div className="mx-2 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar />
      <div className="relative flex flex-col gap-20 mx-auto max-w-screen-lg py-12">
        <Card className="mb-12 overflow-hidden" shadow={false}>
          <img
            alt="Gas Plant"
            className="h-[32rem] w-full object-cover object-center mb-5"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          />
          <Typography variant="h2" color="blue-gray" className="mb-2">
          Gestion d'une Usine de Gaz
        </Typography>
        <Typography color="gray" className="font-normal">
          Bienvenue sur notre application de gestion d'une usine de gaz. Cette plateforme vous aide à gérer efficacement vos employés, vos espaces de travail et à surveiller les capteurs de gaz en temps réel. Grâce à des fonctionnalités avancées et une interface utilisateur intuitive, vous pouvez assurer la sécurité et la productivité de votre usine.
        </Typography>
        </Card>
        
        <div className="flex flex-col gap-10">
        <Card className="flex flex-row items-center" shadow={false}>
           <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-blue-400 mb-5"> Advanced smart sensor technology</h2>
            <Typography>
            Each of ATi’s smart sensor modules is a sensor, amplifier and memory module in one compact package. Sensor modules can be calibrated independently and simply plugged into any of our smart detectors for immediate use. When installed in a gas detector, calibration data is loaded into the microprocessor so that no adjustments are needed. The result is a gas detector that can go from measuring anything from phosgene to ammonia in less than one minute.
            </Typography>
           </div>
           <img src="../../public/MQ2.jpg" alt="capteur MQ2"   className="h-[20rem] w-full object-cover object-center"
           />
        </Card>
        <Card className="flex flex-row items-start" shadow={false}>
           <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-blue-400 mb-5">Montage de l'ESP32 avec les Capteurs MQ-2 et MQ-9</h2>
            <Typography>
            Ces capteurs sont généralement intégrés dans des systèmes électroniques qui peuvent
alerter les utilisateurs en cas de dépassement de seuils de concentration de gaz dange-
reux. Ils sont souvent connectés à des microcontrôleurs comme l’ESP32 pour collecter les
données de manière continue et les transmettre à un système de surveillance ou à une
base de données pour une analyse ultérieure.
En résumé, les capteurs MQ-2 et MQ-9 sont des composants essentiels dans la
détection et la surveillance des gaz, offrant une solution fiable pour la sécurité et la
qualité de l’air dans divers environnements domestiques, industriels et automobiles            </Typography>
           </div>
           <img src="../../public/montage.jpg" alt="montage des capteurs"   className="h-[20rem] w-full object-cover object-center"
           />
        </Card>
        </div>
      </div>
    </div>
  );
}
