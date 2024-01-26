import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const InstructionModal = ({ setInstructionModalOpen }) => {
  return (
    <div
      className="fixed top-0 left-0 z-10 grid w-screen h-screen border border-none backdrop-blur-sm place-content-center"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="dark:bg-btnDark bg-btnLight w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] px-5 py-5 rounded-lg">
        <div className="flex justify-between text-[16px] text-gray-100 sm:text-[24px] items-center">
          <h1>Instructions</h1>
          <RxCrossCircled
            onClick={() => setInstructionModalOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <hr className="w-full h-[5px] border-none bg-gray-100" />
        <ul className="mt-[20px] text-left text-[12px] sm:text-[16px] flex flex-col gap-2 text-gray-800 dark:text-gray-300">
          <li>
            1. Origin and Target points have been chose randomly, to change them
            simply drag it to your desired Node.
          </li>
          <li>
            2. To add walls on grid, simple Click and drag the mouse over the
            region.
          </li>
          <li>
            3. To set the speed of simulation, go to settings and from the drop
            dow menu select the desired speed.
          </li>
          <li>4. To start Visualisation, click on Visualise button.</li>
          <li>
            5. Once pressed, the visualise button gets disabled until the
            simulation ends and you press Clear button.
          </li>
          <li>6. If you want to cleaer the walls press clear</li>
        </ul>
      </div>
    </div>
  );
};

export default InstructionModal;
