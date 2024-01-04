import { BsPersonWorkspace } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi2";
import { FaCircleCheck } from "react-icons/fa6";

const Skills = () => {
  return (
    <div className="flex flex-col justify-center items-center sm:items-start gap-[100px] py-[40px] md:flex-row md:pt-[120px] dark:text-white">
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
              <div className="flex gap-[8px]">
                <FaCircleCheck />
                <div className="flex flex-col">
                  <h5 className="font-bold h-[16px] flex items-center">HTML</h5>
                  <h6 className="text-gray">Experienced</h6>
                </div>
              </div>

              <div className="flex gap-[8px]">
                <FaCircleCheck />
                <div className="flex flex-col">
                  <h5 className="font-bold h-[16px] flex items-center">CSS</h5>
                  <h6 className="text-gray">Experienced</h6>
                </div>
              </div>
              <div className="flex gap-[8px]">
                <FaCircleCheck />
                <div className="flex flex-col">
                  <h5 className="font-bold h-[16px] flex items-center">JS</h5>
                  <h6 className="text-gray">Intermediate</h6>
                </div>
              </div>
              <div className="flex gap-[8px]">
                <FaCircleCheck />
                <div className="flex flex-col">
                  <h5 className="font-bold h-[16px] flex items-center">
                    React
                  </h5>
                  <h6 className="text-gray">Beginner</h6>
                </div>
              </div>
              <div className="flex gap-[8px]">
                <FaCircleCheck />
                <div className="flex flex-col">
                  <h5 className="font-bold h-[16px] flex items-center">Git</h5>
                  <h6 className="text-gray">Intermediate</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
