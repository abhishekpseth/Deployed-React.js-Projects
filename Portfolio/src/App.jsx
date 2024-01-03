import {
  NavigationOptions,
  Introduction,
  Skills,
  ProjectArea,
  ContactArea,
} from "./components";

const App = () => {
  return (
    <div className="px-[30px] lg:px-[130px] md:px-[60px]">
      <section className="min-h-[100vh] ">
        <Introduction />
      </section>

      <section
        id="about"
        className="min-h-[100vh] flex flex-col justify-center items-center gap-[100px] py-[40px] md:flex-row md:pt-[120px]"
      >
        <Skills />
      </section>

      <section
        id="projects"
        className="min-h-[100vh] flex flex-col items-center"
      >
        <ProjectArea />
      </section>

      {/* <section id="contact" className="h-[80vh] grid place-content-center">
        <ContactArea />
      </section> */}

      <footer className="h-[20vh] grid place-content-center">
        <NavigationOptions direction="horizontal" />
      </footer>
    </div>
  );
};

export default App;
