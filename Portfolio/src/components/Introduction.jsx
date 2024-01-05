import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import NavigationOptions from "./NavigationOptions";
import Button from "./Button";

const Introduction = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const onClose = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <>
      <nav className="flex h-[17vh] justify-between items-center xl:px-[120px] dark:text-white">
        <h1 className="text-[24px] sm:text-[28px] md:text-[32px]">
          Abhishek Seth
        </h1>
        <div className="hidden md:block">
          <NavigationOptions direction="horizontal" />
        </div>

        {!showDrawer && (
          <div
            className="text-[24px] sm:text-[28px] md:hidden"
            onClick={onClose}
          >
            <FaBars />
          </div>
        )}

        <div
          className={`z-10 flex flex-col items-center gap-[20px] fixed left-[100vw] top-[0px] w-[40vw] h-[100%] pt-[30px] bg-yellow-400 transition-left ${
            showDrawer ? "left-[60vw]" : ""
          } md:hidden`}
        >
          <div className="bg-white text-[20px] p-[8px] rounded-full grid place-content-center dark:text-black">
            <ImCross onClick={onClose} />
          </div>
          <NavigationOptions direction="vertical" />
        </div>
      </nav>
      <main className="h-[83vh] grid place-content-center ">
        <div className="flex flex-col justify-center items-center gap-8 text-center lg:flex-row">
          <img
            src="././images/profile-pic.JPG"
            alt="File Picture"
            className="h-[250px] w-[250px] rounded-full lg:h-[400px] lg:w-[400px] md:h-[300px] md:w-[300px]"
          />
          <div className="flex flex-col gap-[4px]">
            <p className="text-gray font-medium">Hello, I'm</p>
            <h1 className="font font-semibold text-[26px] sm:text-4xl dark:text-white">
              Abhishek Prasad Seth
            </h1>
            <h2 className="text-gray font font-semibold text-[24px] sm:text-[28px]">
              Frontend Developer
            </h2>
            <div className="flex gap-4 justify-center items-center">
              <Button
                section="introduction"
                text="Download CV"
                color="white"
                link="https://drive.google.com/file/d/1y7kVzO8NGRvfQ-hTbgmBHNndqIWbcUzf/view?usp=drive_link"
                target="_blank"
              />

              <Button
                section="introduction"
                text="Contact Info"
                color="dark"
                link="#contact"
                target=""
              />
            </div>
            <div className="flex gap-4 justify-center items-center dark:text-white">
              <a
                href="https://www.linkedin.com/in/abhishek-p-seth/"
                target="_blank"
              >
                <FaLinkedin className="text-5xl overflow-clip" />
              </a>
              <a href="https://github.com/abhishekpseth" target="_blank">
                <FaGithub className="text-5xl overflow-clip" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Introduction;
