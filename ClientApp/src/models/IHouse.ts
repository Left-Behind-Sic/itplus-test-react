export interface HousesPlants {
  houses: House[];
  plants: Plant[];
}

export interface House {
  ConsumerId: number;
  Name: string;
  consumptions: HouseConsumption[];
}

export interface HouseConsumption {
  Date: Date;
  Weather: number;
  Consumption: number;
}

export interface Plant {
  ConsumerId: number;
  Name: string;
  consumptions: PlantConsumption[];
}

export interface PlantConsumption {
  Date: Date;
  Price: number;
  Consumption: number;
}
