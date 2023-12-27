import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="max-w-[370px m-auto grid min-h-[200px] place-content-center">
            <div className="relative z-50 max-h-[300px] min-w-[300px] bg-white p-4">
              <div className="flex justify-end">
                <AiOutlineClose onClick={onClose} className="text-2xl" />
              </div>
              <div className="m-auto"></div>

              {children}
            </div>
            <div
              onClick={onClose}
              className=" absolute top-0 z-40 h-screen w-screen backdrop-blur"
            />
          </div>
        </>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
