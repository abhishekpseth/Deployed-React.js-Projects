import "./App.css";
import Navigation from "./components/Navigations";
import HeroSection from "./components/Hero";

const App = () => {
  return (
    <div className="container">
      <Navigation />
      <HeroSection />
    </div>
  );
};

export default App;
