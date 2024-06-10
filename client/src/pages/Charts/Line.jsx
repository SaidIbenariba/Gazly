import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

// If you're using Next.js, use the dynamic import for react-apexcharts and remove the import from the top for react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Line = () => {
  const [chartData, setChartData] = useState([
    50, 40, 300, 320, 500, 350, 200, 230, 500,
  ]); // Default data
  const [espaces, setEspaces] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [selectedEspace, setSelectedEspace] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("");

  useEffect(() => {
    const fetchEspaces = async () => {
      try {
        const response = await axios.get(`http://localhost/api/espaces`);
        const espacesData = response.data;
        setEspaces(espacesData);
        if (espacesData.length > 0) {
          const randomEspace = getRandomElement(espacesData);
          setSelectedEspace(randomEspace.id);
        }
      } catch (error) {
        console.error("Error fetching espaces: ", error);
      }
    };

    fetchEspaces();
  }, []);

  useEffect(() => {
    if (selectedEspace) {
      const fetchSensors = async () => {
        try {
          const response = await axios.get(
            `http://localhost/api/espaces/${selectedEspace}/sensors`
          );
          const sensorsData = response.data;
          setSensors(sensorsData);
          if (sensorsData.length > 0) {
            const randomSensor = getRandomElement(sensorsData);
            setSelectedSensor(randomSensor.id);
          }
        } catch (error) {
          console.error("Error fetching sensors: ", error);
        }
      };

      fetchSensors();
    }
  }, [selectedEspace]);

  useEffect(() => {
    if (selectedSensor) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost/api/sensor/${selectedSensor}`
          );
          setChartData(response.data.gazlevel); // Assuming the API returns an object with a gazlevel array
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }
  }, [selectedSensor]);

  const handleEspaceChange = (event) => {
    setSelectedEspace(event.target.value);
    setSelectedSensor("");
  };

  const handleSensorChange = (event) => {
    setSelectedSensor(event.target.value);
  };

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Level",
        data: chartData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "Gaz history",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "12 AM",
          "1 AM",
          "2 AM",
          "3 AM",
          "4 AM",
          "5 AM",
          "6 AM",
          "7 AM",
          "8 AM",
          "9 AM",
          "10 AM",
          "11 AM",
          "12 PM",
          "1 PM",
          "2 PM",
          "3 PM",
          "4 PM",
          "5 PM",
          "6 PM",
          "7 PM",
          "8 PM",
          "9 PM",
          "10 PM",
          "11 PM",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <Card className="w-full md:w-auto">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography variant="h6" color="blue-gray">
            Gaz Historique
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Evolution of gaz
          </Typography>
        </div>
        <div className="flex gap-4">
          <Select
            value={selectedEspace}
            onChange={handleEspaceChange}
            label="Select Espace"
          >
            <Option value="" disabled>
              Select an espace
            </Option>
            {espaces.map((espace) => (
              <Option key={espace.id} value={espace.id}>
                {espace.name}
              </Option>
            ))}
          </Select>
          <Select
            value={selectedSensor}
            onChange={handleSensorChange}
            label="Select Sensor"
            disabled={!selectedEspace}
          >
            <Option value="" disabled>
              Select a sensor
            </Option>
            {sensors.map((sensor) => (
              <Option key={sensor.id} value={sensor.id}>
                {sensor.name}
              </Option>
            ))}
          </Select>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default Line;
