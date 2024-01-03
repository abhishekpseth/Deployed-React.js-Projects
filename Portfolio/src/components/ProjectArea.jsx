import Projects from "./Projects";

const ProjectArea = () => {
  return (
    <>
      <nav className="mt-[20px] flex flex-col justify-center items-center">
        <p className="text-gray text-[16px] sm:text-[20px]">Browse My Recent</p>
        <h1 className="text-3xl sm:text-5xl  font-bold ">Projects</h1>
      </nav>

      <div className="flex justify-center sm:justify-start w-[100%] mt-[60px]">
        <h1 className="bg-yellow-300 p-[10px] text-[24px] sm:text-[32px]">
          React.js Projects
        </h1>
      </div>

      <Projects stack="reactjs" />

      <div className="flex justify-center sm:justify-start w-[100%] mt-[60px]">
        <h1 className="bg-yellow-300 p-[10px] text-[24px] sm:text-[32px]">
          JS Projects
        </h1>
      </div>
      <Projects stack="js" />
    </>
  );
};

export default ProjectArea;
