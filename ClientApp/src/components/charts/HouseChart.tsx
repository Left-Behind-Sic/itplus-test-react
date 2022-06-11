import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchHousesPlants } from "../../store/reducers/ActionCreators";
import { House, HousesPlants } from "../../models/IHouse";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

interface ChartProps {
  housesPlants: HousesPlants;
}

const options = {
  animation: false,
  responsive: true,
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 25,
      },
      title: {
        display: true,
        text: "Температура",
      },
    },
    y: {
      title: {
        display: true,
        text: "Потребление",
      },
    },
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x",
      },
    },
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Зависимость потребления жилых домов от температуры окружающего воздуха",
    },
    tooltip: {
      callbacks: {
        title: (context: any) => `Температура: ${context[0].label} C`,
      },
    },
  },
};

function datas(data: HousesPlants) {
  const rndColor = () => {
    const byte = () => Math.floor(Math.random() * 256);
    return `rgb(${byte()}, ${byte()}, ${byte()})`;
  };
  let inc = 1;

  return data.houses.map((house) => ({
    label: house.Name,
    data: house.consumptions.map((consumption) => consumption.Consumption),
    borderColor: rndColor(),
    backgroundColor: rndColor(),
    tension: 0.1,
  }));
}

export default function Chart({ housesPlants }: ChartProps) {
  // const dispatch = useAppDispatch();
  //
  // const { housesPlants, isLoading, error } = useAppSelector(
  //   (state) => state.houseReducer
  // );
  // useEffect(() => {
  //   dispatch(fetchHousesPlants());
  // }, []);
  // console.log(housesPlants);

  const labels = housesPlants.houses.map((house) =>
    house.consumptions.map((consumption) => consumption.Weather)
  )[0];
  // const labels = housesPlants.houses.flatMap((house) =>
  //   house.consumptions.map((consumption) => consumption.Consumption)
  // );

  // function label(data: HousesPlants) {
  //     return data.houses.map((house) =>
  //         house.consumptions.map((consumption) => consumption.Consumption)
  //     );
  // }
  // console.log(label(housesPlants)[0]);

  // const labels = housesPlants.houses[0].consumptions.flatMap(
  //     (consumption) => consumption.Consumption
  // );
  // const houseConsumption = housesPlants.houses[0].consumptions.flatMap(
  //   (consumption) => consumption.Consumption
  // );

  // console.log(houseConsumption);
  // console.log(labels);

  console.log(datas(housesPlants));
  const data = {
    labels,
    // labels: housesPlants.houses.flatMap((house) =>
    //   house.consumptions.map((consumption) => consumption.Weather)
    // ),
    // datasets: [
    //   {
    //     type: "line",
    //     label: "Температура",
    //     data: houseConsumption,
    //     borderColor: "rgb(255, 99, 132)",
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //     tension: 0.1,
    //     cubicInterpolationMode: "monotone",
    //     pointRadius: 1,
    //   },
    // ],
    datasets: datas(housesPlants),
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}
