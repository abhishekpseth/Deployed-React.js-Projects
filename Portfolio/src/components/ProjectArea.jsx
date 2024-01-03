import Projects from "./Projects";

const ProjectArea = () => {
  return (
    <>
      <nav className="mt-[20px] flex flex-col justify-center items-center">
        <p className="text-gray">Browse My Recent</p>
        <h1 className="text-5xl font-bold">Projects</h1>
      </nav>

      <div className="flex flex-end text-[40px] w-[100%] mt-[60px]">
        <h1 className="bg-yellow-300 p-[10px]">React.js Projects</h1>
      </div>

      <Projects stack="reactjs" />

      <div className="flex flex-end text-[40px] w-[100%] mt-[60px]">
        <h1 className="bg-yellow-300 p-[10px]">JS Projects</h1>
      </div>
      <Projects stack="js" />
    </>
  );
};

export default ProjectArea;
