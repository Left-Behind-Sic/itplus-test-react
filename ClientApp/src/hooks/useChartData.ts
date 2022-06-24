import { HousesPlants } from "../models/IHouse";

export default function useChartData(data: HousesPlants) {
    const unionDates = (setA: Date[], setB: Date[]) => {
        let _union = new Set(setA);
        for (let elem of setB) {
            _union.add(elem);
        }
        return _union;
    };
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

    const consumptions = unionDates(
        housesConsumption.map((e) => e.Date),
        plantsConsumption.map((e) => e.Date)
    );

    let cons = [...consumptions];

    let dates = [...Object.keys(data.houses)]
        .map(() => {
            return cons.sort();
        })
        .flat();

    housesConsumption.forEach(function (item, i, a) {
        if (item.Date !== dates[i]) {
            a.splice(i, 0, {
                Name: item.Name,
                Date: dates[i],
                Consumption: 0,
            });
        }
    });

    plantsConsumption.forEach(function (item, i, a) {
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

    consumption.forEach(function (item, i, a) {
        if (item.Date !== dates[i]) {
            a.splice(i, 0, { Date: dates[i], Consumption: 0 });
        }
    });

    const result = Object.fromEntries(
        consumption.map((item) => [item.Date, 0])
    );

    consumption.forEach((e: { Date: Date; Consumption: number }) => {
        result[e.Date as keyof typeof e.Consumption.toLocaleString] +=
            e.Consumption;
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
        datasets: [...houses, ...plants, fullConsumption],
        labels: [...consumptions].sort().map((e) => {
            const date = new Date(e).toLocaleDateString();
            return date;
        }),
    };
}
