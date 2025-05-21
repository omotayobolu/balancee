import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "./modal";

const ConfirmBookingModal = ({
  setShowModal,
  reset,
  selectedSlot,
  setSelectedSlot,
  setSelectedStation,
  setAvailableStations,
  selectedStation,
}) => {
  return (
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
            className="absolute top-4 right-4 text-grey hover:text-dark-grey cursor-pointer"
          >
            <Icon icon="hugeicons:cancel-01" width="24" height="24" />
          </button>
          <h2 className="text-xl font-bold mb-3 text-center text-black">
            Booking Confirmed! ✅
          </h2>
          <div className="text-left text-sm text-dark-grey space-y-2">
            <p className="text-lg">
              <span className="font-medium">Station:</span>{" "}
              {selectedStation.name}
            </p>
            <p className="text-lg">
              <span className="font-medium">Address:</span>{" "}
              {selectedStation.address}
            </p>
            <p className="text-lg">
              <span className="font-medium">Time:</span>{" "}
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
  );
};

export default ConfirmBookingModal;
