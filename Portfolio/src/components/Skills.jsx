import { BsPersonWorkspace } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi2";
import { FaCircleCheck } from "react-icons/fa6";
import SkillItem from "./SkillItem";

const Skills = () => {
  const skillsList = [
    {
      skill: "HTML",
      rating: "Experienced",
    },
    {
      skill: "CSS",
      rating: "Experienced",
    },
    {
      skill: "JS",
      rating: "Intermediate",
    },
    {
      skill: "React",
      rating: "Beginner",
    },
    {
      skill: "GIT",
      rating: "Intermediate",
    },
  ];

  return (
    <div className=" flex flex-col justify-center items-center md:items-start gap-[100px] py-[40px] md:flex-row md:pt-[120px] dark:text-white">
      <div className="w-[80%] md:w-[50%]">
        <div className="flex flex-col justify-center items-center text-center">
          <p className="c text-[16px] sm:text-[20px]">Get to know More</p>
          <h1 className="text-3xl sm:text-5xl font-bold">About Me</h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-[60px] mt-[40px]">
          <div className="w-[90%] py-[20px] px-[20px] flex flex-col justify-center items-center text-center border border-1 border-gray rounded-2xl">
            <div className="text-gray">
              <BsPersonWorkspace />
            </div>
            <h3 className="font-bold text-gray">Experience</h3>
            <p>Fresher</p>
            <p>Frontend Developer</p>
          </div>

          <div className=" w-[90%] py-[20px] flex flex-col justify-center items-center text-center border border-1 border-gray rounded-2xl">
            <div className="text-gray">
              <HiAcademicCap />
            </div>
            <h3 className="font-bold text-gray">Education</h3>
            <p>B.Tech</p>
            <p>Motilal Nehru National Institute of Technology</p>
          </div>
        </div>
      </div>

      <div className="w-[100%] md:w-[50%] ">
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-gray text-[16px] sm:text-[20px]">Explore My</p>
          <h1 className="text-3xl sm:text-5xl font-bold">Skills</h1>
        </div>

        <div className="flex justify-center">
          <div className="mt-[40px] gap-[40px] px-[20px] py-[20px] max-w-[95%] flex flex-col justify-center items-center text-center border border-1 border-gray rounded-2xl">
            <h3 className="text-gray font-bold text-2xl">
              Frontend Development
            </h3>
            <div className="flex flex-col gap-[20px]">
              {skillsList.map((skill, index) => (
                <SkillItem
                  key={index}
                  skill={skill.skill}
                  rating={skill.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
