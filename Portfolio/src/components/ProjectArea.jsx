import Projects from "./Projects";
import ProjectCategory from "./ProjectCategory";

const ProjectArea = () => {
  return (
    <>
      <nav className="mt-[20px] flex flex-col justify-center items-center">
        <p className="text-gray text-[16px] sm:text-[20px]">Browse My Recent</p>
        <h1 className="text-3xl sm:text-5xl  font-bold dark:text-white">
          Projects
        </h1>
      </nav>

      <ProjectCategory stack="React.js" />
      <ProjectCategory stack="JS" />
    </>
  );
};

export default ProjectArea;
