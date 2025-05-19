import { stationsData } from "./stationsData";

export function getMockStations(carType, service) {
  const filteredStations = service
    ? stationsData.filter((station) => station.services.includes(service))
    : stationsData;

  return {
    carType: carType || null,
    serviceType: service || null,
    stations: filteredStations,
  };
}
