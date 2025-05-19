import { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { FormSelect } from "./components/form-select";
import Modal from "./components/modal";
import { Icon } from "@iconify/react/dist/iconify.js";

const carTypeOptions = [
  "Toyota Corolla",
  "Toyota Camry",
  "Honda Accord",
  "Honda Civic",
  "Lexus RX 350",
  "Kia Rio",
  "Hyundai Elantra",
  "Nissan Altima",
  "Toyota Hiace Bus",
  "Toyota Sienna",
];
const repairServiceOptions = [
  "Oil Change",
  "Brake Pad Replacement",
  "Rocket Booster Installation",
  "Engine Work",
  "AC Repair",
  "Tire Patching & Replacement",
  "Wheel Balancing & Alignment",
  "Battery Service",
  "Suspension Fix",
  "Bodywork & Painting",
  "Transmission Repair",
];

function App() {
  const [availableStations, setAvailableStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [slotError, setSlotError] = useState("");

  const { handleSubmit, control, reset } = useForm({
    mode: "onTouched",
  });

  const carType = useWatch({ control, name: "carType" });
  const repairService = useWatch({ control, name: "repairService" });

  useEffect(() => {
    if (carType && repairService) {
      fetchStations(carType, repairService);
    }
  }, [carType, repairService]);

  const fetchStations = async (carType, repairService) => {
    try {
      setLoading(true);
      console.log(carType, repairService);
      const response = await fetch(
        `https://www.balancee.com/stations?carType=${encodeURIComponent(
          carType
        )}&service=${encodeURIComponent(repairService)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setAvailableStations(result.stations);
    } catch (error) {
      console.error("Error fetching stations:", error);
      setAvailableStations([]);
    } finally {
      setLoading(false);
    }
  };

  const onsubmit = () => {
    if (!selectedSlot || !selectedStation) {
      setSlotError("Please select a time slot.");
      return;
    }

    setSlotError("");
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-dark-grey">
            Book Repair Without Stress
          </h2>
          <p className="text-base sm:text-md mt-2 text-grey">
            No need to guess where to go or wait for hours. With Balanceè,
            you'll see stations, available times, and book fast.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="bg-white border border-border rounded-xl p-5 space-y-6 "
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <FormSelect
              name="carType"
              label="Car Type"
              options={carTypeOptions}
              placeholder="Select your car type"
              control={control}
              className="w-full"
              rules={{ required: "Please select your car type" }}
            />
            <FormSelect
              name="repairService"
              label="Repair Service"
              options={repairServiceOptions}
              placeholder="Select a repair service"
              control={control}
              className="w-full"
              rules={{ required: "Please select a repair service" }}
            />
          </div>

          <div>
            {loading && (
              <p className="text-center text-grey">
                Checking for available stations...
              </p>
            )}
            {!loading &&
              availableStations.length === 0 &&
              carType &&
              repairService && (
                <p className="text-center text-grey">No stations available</p>
              )}
            {slotError && <p className="text-red text-sm">{slotError}</p>}
            {availableStations.length > 0 && (
              <p className="text-lg font-medium mb-2 text-dark-grey">
                Available Stations:
              </p>
            )}
            {availableStations.map((station) => (
              <div
                key={station.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5"
              >
                <p className="text-base font-medium text-dark-grey">
                  {station.name}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {station.availableSlots.map((slot) => {
                    const time = new Date(slot)
                      .toLocaleTimeString([], {
                        hour: "numeric",
                        hour12: true,
                      })
                      .toUpperCase();
                    const isSelected =
                      selectedSlot === slot &&
                      selectedStation?.id === station.id;
                    return (
                      <li
                        key={slot}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setSelectedStation(station);
                          setSlotError("");
                        }}
                        className={`rounded-md py-2 px-4 text-center cursor-pointer text-sm ${
                          isSelected
                            ? "bg-black text-white"
                            : "border border-border text-dark-grey"
                        }`}
                      >
                        {time}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black hover:opacity-90 text-white font-medium rounded-lg text-base cursor-pointer"
          >
            Book Now
          </button>
        </form>
      </div>

      {showModal && (
        <Modal
          onCloseModal={() => {
            setShowModal(false);
            reset();
            setSelectedSlot(null);
            setSelectedStation(null);
            setAvailableStations([]);
          }}
        >
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md relative">
              <button
                onClick={() => {
                  setShowModal(false);
                  reset();
                  setSelectedSlot(null);
                  setSelectedStation(null);
                  setAvailableStations([]);
                }}
                className="absolute top-4 right-4 text-grey hover:text-dark-grey"
              >
                <Icon icon="hugeicons:cancel-01" width="24" height="24" />
              </button>
              <h2 className="text-xl font-bold mb-3 text-center text-black">
                Booking Confirmed!
              </h2>
              <div className="text-left text-sm text-dark-grey space-y-2">
                <p>
                  <span className="font-medium">✅ Station:</span>{" "}
                  {selectedStation.name}
                </p>
                <p>
                  <span className="font-medium">📍 Address:</span>{" "}
                  {selectedStation.address}
                </p>
                <p>
                  <span className="font-medium">🕒 Time:</span>{" "}
                  {new Date(selectedSlot).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
