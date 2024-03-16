import React from "react";
import NavBar from "./components/Nav/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import TabBar from "./components/TabBar/TabBar";
import EditingOptions from "./components/Nav/EditingOptions/EditingOptions";
import Operations from "./components/Nav/operations/Operations";
import Table from "./components/Table/Table";
import Table2 from "./components/Table/Table2";
import useSheetStore from "./SheetStore";
import ColorPicker from "./components/Common/Color Picker/ColorPicker";
import Table3 from "./components/Table/Table3";
import CurrentFeatures from "./components/Modal/CurrentFeatures";

const App = () => {
  const isCustomColorPickerShown = useSheetStore(
    (state) => state.isCustomColorPickerShown
  );

  const showCurrentFeaturesModal = useSheetStore(
    (state) => state.showCurrentFeaturesModal
  );

  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <NavBar />
      <div className="flex overflow-hidden">
        <div className="flex flex-col flex-1">
          <EditingOptions />
          <Operations />
          {/* <Table /> */}
          <Table2 />
          {/* <Table3 /> */}
          <TabBar />
          {isCustomColorPickerShown && <ColorPicker />}
        </div>
        <SideBar />
      </div>
      {showCurrentFeaturesModal && <CurrentFeatures />}
    </div>
  );
};

export default App;
