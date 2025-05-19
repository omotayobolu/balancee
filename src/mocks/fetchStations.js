export async function fetchAvailableStations(carType, service) {
  const { getMockStations } = await import("./handlers");
  return getMockStations(carType, service);
}
