import { http, HttpResponse } from "msw";

const stationsData = [
  {
    id: "station-001",
    name: "Total Filling Station - Lekki",
    address: "KM 14 Lekki-Epe Expressway, Lagos",
    services: [
      "Oil Change",
      "Tire Patching & Replacement",
      "Wheel Balancing & Alignment",
      "Battery Service",
    ],
    availableSlots: [
      "2025-05-17T09:00:00",
      "2025-05-17T11:00:00",
      "2025-05-17T14:30:00",
    ],
  },
  {
    id: "station-002",
    name: "Oando Service Hub - Ikeja",
    address: "13 Obafemi Awolowo Way, Ikeja, Lagos",
    services: ["Brake Pad Replacement", "Engine Work", "Transmission Repair"],
    availableSlots: [
      "2025-05-17T10:00:00",
      "2025-05-17T13:00:00",
      "2025-05-17T15:00:00",
    ],
  },
  {
    id: "station-003",
    name: "Mobil Service Center - Surulere",
    address: "21 Bode Thomas Street, Surulere, Lagos",
    services: [
      "AC Repair",
      "Suspension Fix",
      "Bodywork & Painting",
      "Oil Change",
    ],
    availableSlots: [
      "2025-05-17T08:00:00",
      "2025-05-17T12:00:00",
      "2025-05-17T16:00:00",
    ],
  },
  {
    id: "station-004",
    name: "NIPCO AutoCare - Yaba",
    address: "10 Herbert Macaulay Way, Yaba, Lagos",
    services: [
      "Brake Pad Replacement",
      "Suspension Fix",
      "Battery Service",
      "AC Repair",
    ],
    availableSlots: [
      "2025-05-17T09:30:00",
      "2025-05-17T11:30:00",
      "2025-05-17T14:00:00",
    ],
  },
  {
    id: "station-005",
    name: "Enyo Service Point - Ajah",
    address: "56 Admiralty Way, Ajah, Lagos",
    services: [
      "Tire Patching & Replacement",
      "Wheel Balancing & Alignment",
      "Bodywork & Painting",
      "Transmission Repair",
    ],
    availableSlots: [
      "2025-05-17T08:30:00",
      "2025-05-17T12:30:00",
      "2025-05-17T15:30:00",
    ],
  },
];

export const handlers = [
  http.get("https://www.balancee.com/stations", ({ request }) => {
    const url = new URL(request.url);
    const serviceQuery = url.searchParams.get("service");
    const carTypeQuery = url.searchParams.get("carType");

    const filteredStations = serviceQuery
      ? stationsData.filter((station) =>
          station.services.includes(serviceQuery)
        )
      : stationsData;

    return HttpResponse.json({
      carType: carTypeQuery || null,
      serviceType: serviceQuery || null,
      stations: filteredStations,
    });
  }),
];
