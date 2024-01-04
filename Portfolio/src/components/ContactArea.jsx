import { FaLinkedin } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";

const ContactArea = () => {
  return (
    <>
      <nav className="flex flex-col justify-center items-center">
        <p className="text-gray text-[16px] sm:text-[20px]">Get in Touch</p>
        <h1 className="text-3xl sm:text-5xl  font-bold dark:text-white">
          Contact Me
        </h1>
      </nav>
      <main className="px-[16px] py-[16px] mt-[40px] flex flex-col gap-[10px] justify-center items-center border border-1 border-gray rounded-[40px] dark:text-white">
        <div className="flex gap-[8px] items-center">
          <ImMail4 className="text-xl sm:text-4xl dark:text-gray" />
          <h1 className="text-sm sm:text-2xl">abhishekpseth@gmail.com</h1>
        </div>

        <div className="flex gap-[8px] items-center">
          <FaLinkedin className="text-xl sm:text-4xl dark:text-gray" />
          <h1 className="text-sm sm:text-2xl">abhishekpseth</h1>
        </div>
      </main>
    </>
  );
};

export default ContactArea;
