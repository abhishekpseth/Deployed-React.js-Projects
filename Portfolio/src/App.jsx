import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi2";
import { FaCircleCheck } from "react-icons/fa6";
import { ImMail4 } from "react-icons/im";
import NavigationOptions from "./components/NavigationOptions";
import Projects from "./components/Projects";

const App = () => {
  return (
    <div className="px-[170px]">
      <section className="h-[100vh]">
        <nav className="flex h-[17vh] justify-between items-center px-[130px]">
          <h1 className="text-[32px]">Abhishek Seth</h1>
          <NavigationOptions />
        </nav>
        <main className="h-[83vh] grid place-content-center">
          <div className="flex justify-center items-center gap-12 text-center">
            <img
              src="/images/profile-pic.JPG"
              alt="File Picture"
              className="h-[400px] w-[400px] rounded-full"
            />
            <div className="flex flex-col gap-[1rem]">
              <p className="text-gray font-medium">Hello, I'm</p>
              <h1 className="font font-semibold text-4xl">
                Abhishek Prasad Seth
              </h1>
              <h2 className="text-gray font font-semibold text-[28px]">
                Frontend Developer
              </h2>
              <div className="flex gap-4 justify-center items-center">
                {/* <button className="p-3 border rounded-3xl font font-medium">
                  Download CV
                </button> */}
                <a href="#contact">
                  <button className="p-3 border rounded-3xl font font-medium text-white bg-darkGray">
                    Contact Info
                  </button>
                </a>
              </div>
              <div className="flex gap-4 justify-center items-center">
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
      </section>

      <section id="about" className="h-[100vh] flex pt-[120px]">
        <div className="w-[50%] ">
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray">Get to know More</p>
            <h1 className="text-5xl font-bold">About Me</h1>
          </div>

          <div className="flex flex-col justify-center items-center gap-[60px] mt-[40px]">
            <div className="w-[80%] py-[20px] flex flex-col justify-center items-center border border-1 border-gray rounded-2xl">
              <BsPersonWorkspace />
              <h3 className="font-bold">Experience</h3>
              <p>Fresher</p>
              <p>Frontend Developer</p>
            </div>

            <div className=" w-[80%] py-[20px] flex flex-col justify-center items-center border border-1 border-gray rounded-2xl">
              <HiAcademicCap />
              <h3 className="font-bold">Education</h3>
              <p>B.Tech</p>
              <p>Motilal Nehru National Institute of Technology</p>
            </div>
          </div>
        </div>

        <div className="w-[50%] ">
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray">Explore My</p>
            <h1 className="text-5xl font-bold">Skills</h1>
          </div>

          <div className="flex justify-center">
            <div className="mt-[40px] gap-[40px] p-[2rem] w-[40%] flex flex-col justify-center items-center border border-1 border-gray rounded-2xl">
              <h3 className="text-gray font-bold text-2xl">
                Frontend Development
              </h3>
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[8px]">
                  <FaCircleCheck />
                  <div className="flex flex-col">
                    <h5 className="font-bold h-[16px] flex items-center">
                      HTML
                    </h5>
                    <h6 className="text-gray">Experienced</h6>
                  </div>
                </div>

                <div className="flex gap-[8px]">
                  <FaCircleCheck />
                  <div className="flex flex-col">
                    <h5 className="font-bold h-[16px] flex items-center">
                      CSS
                    </h5>
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
                    <h5 className="font-bold h-[16px] flex items-center">
                      Git
                    </h5>
                    <h6 className="text-gray">Intermediate</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="min-h-[100vh] flex flex-col items-center"
      >
        <nav className="mt-[20px] flex flex-col justify-center items-center">
          <p className="text-gray">Browse My Recent</p>
          <h1 className="text-5xl font-bold">Projects</h1>
        </nav>

        <div className="flex flex-end text-[40px] w-[100%] mt-[60px]">
          <h1 className="bg-red-500 p-[10px]">React.js Projects</h1>
        </div>

        <Projects stack="reactjs" />

        <div className="flex flex-end text-[40px] w-[100%] mt-[60px]">
          <h1 className="bg-red-500 p-[10px]">JS Projects</h1>
        </div>
        <Projects stack="js" />
      </section>

      <section id="contact" className="h-[80vh] grid place-content-center">
        <nav className="flex flex-col justify-center items-center">
          <p className="text-gray">Get in Touch</p>
          <h1 className="text-5xl font-bold">Contact Me</h1>
        </nav>
        <main className="px-[2rem] py-[2rem] mt-[40px] flex flex-col gap-[30px] justify-center items-center border border-1 border-gray rounded-[40px]">
          <div className="flex gap-[8px]">
            <ImMail4 className="text-4xl" />
            <h1 className="text-2xl">abhishekpseth@gmail.com</h1>
          </div>

          <div className="flex gap-[8px]">
            <FaLinkedin className="text-4xl" />
            <h1 className="text-2xl">abhishekpseth</h1>
          </div>
        </main>
      </section>

      <footer className="h-[20vh] grid place-content-center">
        <NavigationOptions />
      </footer>
    </div>
  );
};

export default App;
