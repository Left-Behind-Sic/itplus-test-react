import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { houseSlice } from "./store/reducers/HouseSlice";
import { fetchHouses } from "./store/reducers/ActionCreators";
import { House, HousesPlants } from "./models/IHouse";

function App() {
  const { housesPlants, isLoading, error } = useAppSelector(
    (state) => state.houseReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  // let houseMap = Object.entries(housesPlants.houses);
  // console.log(houseMap);

  return (
    <div className="App">
      {isLoading && <h1>Загрузка</h1>}
      {error && <h1>Ошибка</h1>}
      {/*{JSON.stringify(housesPlants, null, 4)}*/}
      {housesPlants.houses.map((house) => (
        <div key={house.ConsumerId}>
          <h1>
            {house.ConsumerId}. {house.Name}
          </h1>
          <div>
            {house.consumptions.map((consumption, index) => (
              <span key={index}>
                <h2>Дата: {consumption.Date}</h2>
                <p> Температура: {consumption.Weather}</p>
                <strong>Потребление: {consumption.Consumption}</strong>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
