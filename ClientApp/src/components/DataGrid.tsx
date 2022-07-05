import {
	DataGrid,
	GridCellEditCommitParams,
	GridColDef,
} from "@mui/x-data-grid";
import { usePutData } from "../store/reducers/ActionCreators";
import {
	dataChange,
	IHousePlantsConsumptions,
} from "../store/reducers/HousesPlantsSlice";
import { useAppDispatch } from "./../hooks/redux";
import useGetData from "./../hooks/useGetData";
import { HousesPlants } from "./../models/IHouse";
import { queryClient } from "./../main";

export default function Grid() {
	const { data, isFetching, isSuccess } = useGetData();
	const housesPlants = data as HousesPlants;

	const dispatch = useAppDispatch();

	const mutation = usePutData();

	const columns: GridColDef[] = [
		{
			field: "Name",
			headerName: "Название объекта",
			flex: 0.8,
			align: "center",
			headerAlign: "center",
			type: "string",
		},
		{
			field: "Date",
			type: "date",
			valueGetter: ({ value }) => value && new Date(value),
			headerName: "Дата",
			editable: true,
			flex: 0.7,
			align: "center",
			headerAlign: "center",
		},
		{
			field: "Weather",
			type: "number",
			headerName: "Температура",
			editable: true,
			flex: 0.4,
			align: "center",
			headerAlign: "center",
		},
		{
			field: "Consumption",
			type: "number",
			headerName: "Потребление",
			editable: true,
			flex: 0.7,
			align: "center",
			headerAlign: "center",
		},
		{
			field: "Price",
			type: "number",
			headerName: "Цена на кирпич",
			editable: true,
			flex: 0.7,
			align: "center",
			headerAlign: "center",
		},
	];

	const rows = () => {
		let inc: number = 0;
		const houseRows = housesPlants.houses.flatMap((house) =>
			house.consumptions.map((item) => ({
				id: inc++,
				Name: house.Name,
				ConsumerId: house.ConsumerId,
				Date: item.Date,
				Weather: item.Weather,
				Consumption: item.Consumption,
			}))
		);

		const plantRows = housesPlants.plants.flatMap((plant) =>
			plant.consumptions.map((item) => ({
				id: inc++,
				Name: plant.Name,
				ConsumerId: plant.ConsumerId,
				Date: item.Date,
				Price: item.Price,
				Consumption: item.Consumption,
			}))
		);
		return [...houseRows, ...plantRows];
	};

	const handleCommit = (e: GridCellEditCommitParams) => {
		if (e.field === "Date") {
			e.value = new Date(
				e.value.getTime() - e.value.getTimezoneOffset() * 60000
			)
				.toISOString()
				.slice(0, -5);
		}
		let inc: number = 0;
		const houseRows = housesPlants.houses.flatMap((house) =>
			house.consumptions.map((item) => ({
				id: inc++,
				Name: house.Name,
				ConsumerId: house.ConsumerId,
				Date: item.Date,
				Weather: item.Weather,
				Consumption: item.Consumption,
			}))
		);

		const plantRows = housesPlants.plants.flatMap((plant) =>
			plant.consumptions.map((item) => ({
				id: inc++,
				Name: plant.Name,
				ConsumerId: plant.ConsumerId,
				Date: item.Date,
				Price: item.Price,
				Consumption: item.Consumption,
			}))
		);
		const changed = [...houseRows, ...plantRows].map((r) => {
			if (r.id === e.id) {
				return {
					...r,
					[e.field]: e.value,
				};
			} else {
				return { ...r };
			}
		});

		let name = [...new Set(changed.map((a) => a.Name))];
		let ids = [...new Set(changed.map((a) => a.ConsumerId))];
		const nameIds = name.map((e, i) => ({
			Name: e,
			ConsumerId: ids[i],
			consumptions: [],
		}));

		let result = nameIds.map((item) => ({
			Name: item.Name,
			ConsumerId: item.ConsumerId,
			consumptions: changed
				.filter((e) => {
					if (e.ConsumerId === item.ConsumerId) {
						return true;
					}
				})
				.map((i: IHousePlantsConsumptions) =>
					i.Weather
						? {
								Date: i.Date,
								Consumption: i.Consumption,
								Weather: i.Weather,
						  }
						: {
								Date: i.Date,
								Consumption: i.Consumption,
								Price: i.Price,
						  }
				),
		}));

		const main: HousesPlants = {
			houses: result.filter((e) => e.Name.includes("дом")),
			plants: result.filter((e) => e.Name.includes("завод")),
		};

		// console.log(result);

		// console.log(housesPlants);

		mutation.mutate(main);
	};

	return (
		<div style={{ width: "100%" }}>
			{isSuccess ? (
				<DataGrid
					autoHeight
					getRowId={(row) => row.id}
					columns={columns}
					rows={rows()}
					onCellEditCommit={handleCommit}
					sx={{ fontSize: { xs: 9, md: 14 } }}
				/>
			) : (
				<></>
			)}
			{isFetching && <p>Updating..</p>}
		</div>
	);
}
