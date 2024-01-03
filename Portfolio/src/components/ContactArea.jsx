import { FaLinkedin } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";

const ContactArea = () => {
  return (
    <>
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
    </>
  );
};

export default ContactArea;
