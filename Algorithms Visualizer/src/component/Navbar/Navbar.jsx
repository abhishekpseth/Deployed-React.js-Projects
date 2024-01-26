import NavOptions from "./NavOptions";
import Labellings from "./Labellings";

const Navbar = () => {
  return (
    <div className="flex flex-col py-2 sm:py-4">
      <div className="flex flex-col items-center justify-around gap-3 py-2 md:flex-row">
        <h1 className="text-navbarTextLight dark:text-navbarTextDark sm:text-[24px] md:[28px] lg:text-[32px] font-bold">
          Algorithm Visualizer
        </h1>
        <NavOptions />
      </div>
      <div className="flex items-center justify-center sm:py-2">
        <Labellings />
      </div>
    </div>
  );
};

export default Navbar;
