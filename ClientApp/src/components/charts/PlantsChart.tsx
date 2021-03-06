import React from "react";
import {
    CategoryScale,
    Chart as ChartJS,
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
import { useAppSelector } from "../../hooks/redux";

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

const options: object = {
    animation: false,
    maintainAspectRatio: false,
    scales: {
        x: {
            ticks: {
                autoSkip: true,
            },
            title: {
                display: true,
                text: "Цена на кирпич",
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
            text: "Зависимость потребления заводов от цены на кирпич",
        },
        tooltip: {
            callbacks: {
                title: (context: { label: string }[]) =>
                    `Цена: ${context[0].label}`,
            },
        },
    },
};

export default function PlantsChart() {
    const { housesPlants } = useAppSelector(
        (state) => state.housesPlantsReducer
    );
    const newArray = housesPlants.plants
        .flatMap((plant) => plant.consumptions)
        .sort((a, b) => (a.Price as number) - (b.Price as number));

    const labels = newArray.map((consumption) =>
        consumption?.Price?.toFixed(2)
    );

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Потребление",
                data: newArray.map((consumption) => consumption.Consumption),
                borderColor: "rgb(88, 138, 127)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                tension: 0.1,
            },
        ],
    };
    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}
