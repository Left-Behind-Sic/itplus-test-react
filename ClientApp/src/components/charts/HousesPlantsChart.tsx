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
import useChartData from "../../hooks/useChartData";
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
                text: "Дата",
            },
        },
        y: {
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
                title: (context: { label: string }[]) =>
                    `Дата: ${context[0].label}`,
            },
        },
    },
};

interface ChartProps {
    housesPlants: HousesPlants;
}

export default function Chart({ housesPlants }: ChartProps) {
    const { labels, datasets } = useChartData(housesPlants);

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
