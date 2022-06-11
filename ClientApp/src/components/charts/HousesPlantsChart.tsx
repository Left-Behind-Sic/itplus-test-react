import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import { HousesPlants } from "../../models/IHouse";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  Filler
);

interface ChartProps {
  housesPlants: HousesPlants;
}

const options = {
  animation: false,
  responsive: true,
  scales: {
    x: {
      min: 0,
      max: 100,
      ticks: {
        autoSkip: true,
        maxTicksLimit: 25,
      },
      title: {
        display: true,
        text: "Дата",
      },
    },
    y: {
      // min: 0,
      // max: 650000,
      stacked: true,
      title: {
        display: true,
        text: "Потребление",
      },
    },
  },
  plugins: {
    filler: {
      propagate: true,
    },
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
      text: "Общее потребление городом по дате",
    },
    tooltip: {
      callbacks: {
        title: (context: any) => `Дата: ${context[0].label}`,
      },
    },
  },
};

function union(setA: any, setB: any) {
  let _union = new Set(setA);
  for (let elem of setB) {
    _union.add(elem);
  }
  return _union;
}

function datas(data: HousesPlants) {
  const rndColor = () => {
    const byte = () => Math.floor(Math.random() * 256);
    return `rgb(${byte()}, ${byte()}, ${byte()})`;
  };

  const rndColorRGBA = () => {
    const byte = () => Math.floor(Math.random() * 256);
    return `rgba(${byte()}, ${byte()}, ${byte()}, 0.8)`;
  };

  let housesConsumption = data.houses
    .flatMap((item) => item.consumptions.flat(Infinity))
    .map((item) => ({
      Date: item.Date,
      Consumption: item.Consumption,
    }));

  let plantsConsumption = data.plants
    .flatMap((item) => item.consumptions.flat(Infinity))
    .map((item) => ({
      Date: item.Date,
      Consumption: item.Consumption,
    }));

  let consumptions = union(
    housesConsumption.map((e) => e.Date),
    plantsConsumption.map((e) => e.Date)
  );

  let dates = [...Object.keys(data.houses)]
    .map(() => [...consumptions].sort())
    .flat();

  housesConsumption.forEach(function (item, i, a) {
    if (item.Date !== dates[i]) {
      a.splice(i, 0, { Date: dates[i], Consumption: 0 });
    }
  });

  plantsConsumption.forEach(function (item, i, a) {
    if (item.Date !== dates[i]) {
      a.splice(i, 0, { Date: dates[i], Consumption: 0 });
    }
  });

  const houses = data.houses.map((house) => ({
    label: house.Name,
    data: housesConsumption.map((consumption) => consumption.Consumption),
    borderColor: rndColor(),
    backgroundColor: rndColorRGBA(),
    fill: true,
    radius: 1,
  }));

  const plants = data.plants.map((plant) => ({
    label: plant.Name,
    data: plant.consumptions.map((consumption) => consumption.Consumption),
    borderColor: rndColor(),
    backgroundColor: rndColorRGBA(),
    fill: true,
    radius: 1,
  }));

  let consumption = [...housesConsumption, ...plantsConsumption].map(
    (item) => ({
      Date: item.Date,
      Consumption: item.Consumption,
    })
  );

  consumption.forEach(function (item, i, a) {
    if (item.Date !== dates[i]) {
      a.splice(i, 0, { Date: dates[i], Consumption: 0 });
    }
  });

  const result = Object.fromEntries(consumption.map((item) => [item.Date, 0]));
  consumption.forEach((e) => {
    result[e.Date] += e.Consumption;
  });

  const fullConsumption = {
    label: "Общее потребление городом",
    data: Object.values(result),
    borderColor: rndColor(),
    backgroundColor: rndColorRGBA(),
    fill: false,
    radius: 3,
    stack: "none",
  };

  return [...houses, ...plants, fullConsumption];
}

export default function Chart({ housesPlants }: ChartProps) {
  const labels = housesPlants.plants.map((plant) =>
    plant.consumptions.map((consumption) =>
      new Date(consumption.Date).toLocaleDateString()
    )
  )[0];

  const datasets = datas(housesPlants);
  const data = {
    labels,
    datasets,
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}
