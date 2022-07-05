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
import { useMemo } from "react";
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
    zoomPlugin
);

const options: object = {
    animation: false,
    maintainAspectRatio: false,
    scales: {
        x: {
            min: 0,
            max: 100,
            ticks: {
                autoSkip: true,
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
                title: (context: { label: string }[]) =>
                    `Температура: ${context[0].label} C`,
            },
        },
    },
};

function datas(data: HousesPlants) {
    const rndColor = () => {
        const byte = () => Math.floor(Math.random() * 256);
        return `rgb(${byte()}, ${byte()}, ${byte()})`;
    };

    return data.houses.map((house) => ({
        label: house.Name,
        data: house.consumptions.map((consumption) => consumption.Consumption),
        borderColor: useMemo(() => rndColor(), [data]),
        backgroundColor: useMemo(() => rndColor(), [data]),
        tension: 0.1,
        fill: false,
    }));
}

interface ChartProps {
    housesPlants: HousesPlants;
}

export default function Chart({ housesPlants }: ChartProps) {
    const labels = housesPlants.houses.map((house) =>
        house.consumptions.map((consumption) => consumption.Weather)
    )[0];

    const datasets = datas(housesPlants);
    const dataComponent = {
        labels,
        datasets,
    };
    return (
        <>
            <Line options={options} data={dataComponent} />
        </>
    );
}
