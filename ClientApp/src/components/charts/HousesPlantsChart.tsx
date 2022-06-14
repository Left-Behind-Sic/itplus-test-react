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
import { useAppSelector } from "../../hooks/redux";

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

    let housesConsumption = data.houses.flatMap((item) =>
        item.consumptions.flatMap((item2) => ({
            Name: item.Name,
            Date: item2.Date,
            Consumption: item2.Consumption,
        }))
    );

    let plantsConsumption = data.plants.flatMap((item) =>
        item.consumptions.flatMap((item2) => ({
            Name: item.Name,
            Date: item2.Date,
            Consumption: item2.Consumption,
        }))
    );

    let consumptions = union(
        housesConsumption.map((e) => e.Date),
        plantsConsumption.map((e) => e.Date)
    );

    let dates = [...Object.keys(data.houses)]
        .map(() => [...consumptions].sort())
        .flat();

    housesConsumption.forEach(function (item, i, a: any) {
        if (item.Date !== dates[i]) {
            a.splice(i, 0, {
                Name: item.Name,
                Date: dates[i],
                Consumption: 0,
            });
        }
    });

    plantsConsumption.forEach(function (item, i, a: any) {
        if (item.Date !== dates[i]) {
            a.splice(i, 0, { Name: item.Name, Date: dates[i], Consumption: 0 });
        }
    });

    let housesName = [...new Set(housesConsumption.map((e) => e.Name))];
    const houses = housesName.map((house) => ({
        label: house,
        data: housesConsumption
            .filter((e) => {
                if (e.Name === house) {
                    return true;
                }
            })
            .map((consumption) => consumption.Consumption),
        borderColor: rndColor(),
        backgroundColor: rndColorRGBA(),
        fill: true,
        radius: 1,
    }));
    let plantsName = [...new Set(plantsConsumption.map((e) => e.Name))];

    const plants = plantsName.map((plant) => ({
        label: plant,
        data: plantsConsumption
            .filter((e) => {
                if (e.Name === plant) {
                    return true;
                }
            })
            .map((consumption) => consumption.Consumption),
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

    consumption.forEach(function (item, i, a: any) {
        if (item.Date !== dates[i]) {
            a.splice(i, 0, { Date: dates[i], Consumption: 0 });
        }
    });

    const result = Object.fromEntries(
        consumption.map((item) => [item.Date, 0])
    );

    consumption.forEach((e: any) => {
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

    return {
        datas: [...houses, ...plants, fullConsumption],
        labels: [...consumptions].sort().map((e) => {
            const date = new Date(e).toLocaleDateString();
            return date;
        }),
    };
}

export default function Chart() {
    const { housesPlants } = useAppSelector(
        (state) => state.housesPlantsReducer
    );
    const labels = datas(housesPlants).labels;

    const datasets = datas(housesPlants).datas;
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
