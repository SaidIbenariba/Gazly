import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Line = () => {
  const [chartData, setChartData] = useState([]); // State to hold chart data
  const [espaces, setEspaces] = useState([]); // State for workspaces
  const [sensors, setSensors] = useState([]); // State for sensors
  const [selectedEspace, setSelectedEspace] = useState(""); // Selected workspace
  const [selectedSensor, setSelectedSensor] = useState(""); // Selected sensor
  const [selectedEspaceName, setSelectedEspaceName] = useState(""); // Name of selected workspace
  const [selectedSensorName, setSelectedSensorName] = useState(""); // Name of selected sensor

  // Fetch all workspaces on component mount
  useEffect(() => {
    const fetchEspaces = async () => {
      try {
        const response = await axios.get("/api/workspaces");
        setEspaces(response.data);
        if (response.data.length > 0) {
          const randomEspace = getRandomElement(response.data);
          // console.log(randomEspace);
          setSelectedEspace(randomEspace.id.toString());
          setSelectedEspaceName(randomEspace.name);
        }
      } catch (error) {
        console.error("Error fetching workspaces: ", error);
      }
    };

    fetchEspaces();
  }, []);

  // Fetch sensors when selectedEspace changes
  useEffect(() => {
    if (selectedEspace) {
      const fetchSensors = async () => {
        try {
          const response = await axios.get(
            `/api/sensors/workspace/${selectedEspace}`
          );
          setSensors(response.data);
          if (response.data.length > 0) {
            const randomSensor = getRandomElement(response.data);
            setSelectedSensor(randomSensor.id.toString());
            setSelectedSensorName(randomSensor.type);
          }
        } catch (error) {
          console.error("Error fetching sensors: ", error);
        }
      };

      fetchSensors();
    }
  }, [selectedEspace]);

  // Fetch data when selectedSensor changes
  useEffect(() => {
    if (selectedSensor) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `/api/measures/sensor/${selectedSensor}`
          );
          const data = response.data.map((measure) => measure.gazlvl);
          setChartData(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }
  }, [selectedSensor]);

  // Handle change in selected workspace
  const handleEspaceChange = (value) => {
    setSelectedEspace(value);
    setSelectedSensor(""); // Clear selected sensor when workspace changes
    const selectedEspaceObj = espaces.find((espace) => espace.id === value);
    setSelectedEspaceName(selectedEspaceObj ? selectedEspaceObj.name : "");
  };

  // Handle change in selected sensor
  const handleSensorChange = (value) => {
    setSelectedSensor(value);
    const selectedSensorObj = sensors.find((sensor) => sensor.id === value);
    setSelectedSensorName(selectedSensorObj ? selectedSensorObj.type : "");
  };

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Gaz Level",
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
        text: "Gaz History",
        align: "left",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: Array.from({ length: 24 }, (_, i) => {
          const hour = i % 12 === 0 ? 12 : i % 12;
          const period = i < 12 ? "AM" : "PM";
          return `${hour} ${period}`;
        }),
      },
      yaxis: {
        title: {
          text: "Gaz Level",
        },
      },
    },
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div>
            <Typography variant="h6" color="blue-gray">
              Gaz History
            </Typography>
            <Typography variant="small" color="gray">
              Evolution of Gaz Levels
            </Typography>
          </div>
          <div className="flex gap-4">
            <Select
              value={selectedEspaceName}
              onChange={handleEspaceChange}
              label="Select Workspace"
              title="said"
            >
              <Option value="">Select a Workspace</Option>
              {espaces.map((espace) => (
                <Option key={espace.id} value={espace.id}>
                  {espace.name}
                </Option>
              ))}
            </Select>
            <Select
              value={selectedSensorName}
              onChange={handleSensorChange}
              label="Select Sensor"
              disabled={!selectedEspace}
            >
              <Option value="">Select a Sensor</Option>
              {sensors.map((sensor) => (
                <Option key={sensor.id} value={sensor.id}>
                  {sensor.type}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {/* Show selected workspace and sensor names */}
        {selectedEspaceName && selectedSensorName && (
          <div className="mt-4">
            <Typography variant="body1" color="blue-gray">
              Selected Workspace: {selectedEspaceName}
            </Typography>
            <Typography variant="body1" color="blue-gray">
              Selected Sensor: {selectedSensorName}
            </Typography>
          </div>
        )}
        <div className="mt-4">
          {/* Conditionally render the chart based on chartData */}
          {chartData.length > 0 ? (
            <Chart {...chartConfig} />
          ) : (
            <Typography variant="body2" color="gray">
              No data available for selected sensor.
            </Typography>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Line;
