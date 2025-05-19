import { Icon } from "@iconify/react/dist/iconify.js";

const Modal = ({ onCloseModal, children }) => {
  return (
    <div>
      <div
        className="bg-modal w-full h-screen z-30 fixed top-0 left-0 overflow-hidden"
        onClick={onCloseModal}
      />

      {children}
    </div>
  );
};

export default Modal;
