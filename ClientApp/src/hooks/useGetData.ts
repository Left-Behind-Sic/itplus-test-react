import { useQuery } from "react-query";
import { getData } from "../store/reducers/ActionCreators";
import { HousesPlants } from "./../models/IHouse";

function useGetData() {
    return useQuery<HousesPlants, Error>("housesPlants", getData);
}

export default useGetData;
