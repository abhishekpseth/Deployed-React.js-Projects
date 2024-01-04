import { Introduction, Skills, ProjectArea, ContactArea } from "./components";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/theme";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    // here theme changes
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      
      <div className="px-[30px] lg:px-[130px] md:px-[60px] dark:bg-black">
        <section className="min-h-[100vh] ">
          <Introduction />
        </section>

        <section id="about" className="min-h-[100vh]">
          <Skills />
        </section>

        <section
          id="projects"
          className="min-h-[100vh] flex flex-col items-center"
        >
          <ProjectArea />
        </section>

        <section id="contact" className="h-[80vh] grid place-content-center">
          <ContactArea />
        </section>
        {/* <footer className="h-[5vh] grid place-content-center bg-yellow-400"></footer> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
