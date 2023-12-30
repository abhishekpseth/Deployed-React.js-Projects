const Projects = ({ stack }) => {
  const reactProjectsArray = [
    {
      projectNo: 1,
      projectName: "Brand Page",
      imgSrc: "././images/brand-page.jpg",
      github:
        "https://github.com/abhishekpseth/Deployed-React.js-Projects/tree/main/Brand-Page",
      weblink: "https://brand-page-project.netlify.app/",
    },
    {
      projectNo: 2,
      projectName: "Contact Page",
      imgSrc: "././images/contact-page.jpg",
      github:
        "https://github.com/abhishekpseth/Deployed-React.js-Projects/tree/main/Contact-Page",
      weblink: "https://contactpage-project.netlify.app/",
    },
    {
      projectNo: 3,
      projectName: "Dice Game",
      imgSrc: "././images/dice-game.jpg",
      github:
        "https://github.com/abhishekpseth/Deployed-React.js-Projects/tree/main/Dice-Game",
      weblink: "https://guess-dice-game-project.netlify.app/",
    },
    {
      projectNo: 4,
      projectName: "Firebase Contact App-CRUD",
      imgSrc: "././images/firebase-contact-app.jpg",
      github:
        "https://github.com/abhishekpseth/Deployed-React.js-Projects/tree/main/Firebase-Contact-App-CRUD",
      weblink: "https://firebase-contact-app-crud.netlify.app/",
    },
  ];

  const jsProjectsArray = [
    {
      projectNo: 1,
      projectName: "Life Timer",
      imgSrc: "././images/life-timer.jpg",
      github:
        "https://github.com/abhishekpseth/JS-Projects--deployed/tree/main/Life%20timer",
      weblink: "https://lifetimer-project.netlify.app/",
    },
    {
      projectNo: 2,
      projectName: "Github Profile Viewer",
      imgSrc: "././images/github-profile-viewer.jpg",
      github:
        "https://github.com/abhishekpseth/JS-Projects--deployed/tree/main/Github%20Profile%20Viewer",
      weblink: "https://search-github-profile-project.netlify.app/",
    },
    {
      projectNo: 3,
      projectName: "Product Search & Filter",
      imgSrc: "././images/fetch-product.jpg",
      github:
        "https://github.com/abhishekpseth/JS-Projects--deployed/tree/main/Fetch%20Products%20Search%20%26%20Filter",
      weblink: "https://fetchproduct-searchandfilter-project.netlify.app/",
    },
    {
      projectNo: 4,
      projectName: "QR Code Generator",
      imgSrc: "././images/qr-code.jpg",
      github:
        "https://github.com/abhishekpseth/JS-Projects--deployed/tree/main/QR%20Code%20Generator",
      weblink: "https://qrcode-generatorproject.netlify.app/",
    },
    {
      projectNo: 5,
      projectName: "Expense Tracker",
      imgSrc: "././images/expense-tracker.jpg",
      github:
        "https://github.com/abhishekpseth/JS-Projects--deployed/tree/main/Expense%20Tracker",
      weblink: "https://trackyourexpenses-project.netlify.app/",
    },
    {
      projectNo: 6,
      projectName: "Password Generator",
      imgSrc: "././images/passwordGenerator.jpg",
      github:
        "https://github.com/abhishekpseth/JS-Projects--deployed/tree/main/Password%20Generator",
      weblink: "https://generatepasswords-project.netlify.app/",
    },
    {
      projectNo: 7,
      projectName: "Analog Clock",
      imgSrc: "././images/analog-clock.jpg",
      github:
        "https://github.com/abhishekpseth/JS-Projects--deployed/tree/main/Analog%20Clock",
      weblink: "https://classic-analogclock-project.netlify.app/",
    },
    {
      projectNo: 8,
      projectName: "Tic Tac Toe",
      imgSrc: "././images/tic-tac-toe.jpg",
      github:
        "https://github.com/abhishekpseth/JS-Projects--deployed/tree/main/Tic%20Tac%20Toe",
      weblink: "https://tic-tac-toe-prject.netlify.app/",
    },
    {
      projectNo: 9,
      projectName: "Circular Carousel",
      imgSrc: "././images/carousel.jpg",
      github:
        "https://github.com/abhishekpseth/Deployed-JS-projects/tree/main/Carousel",
      weblink: "https://circular-carousel-project.netlify.app/",
    },
  ];

  const stackProjectsArray =
    stack === "reactjs" ? reactProjectsArray : jsProjectsArray;

  return (
    <main className="w-[100%] flex flex-wrap gap-[40px] mt-[60px] justify-center items-center">
      {stackProjectsArray.map((_, index) => (
        <div className="px-[1.5rem] py-[1rem] gap-[15px] flex flex-col justify-center items-center border border-1 border-gray rounded-[40px] bg-extraDrakGray">
          <img
            src={stackProjectsArray[index].imgSrc}
            className="w-[300px] h-[300px] border rounded-[36px]"
          />
          <h1 className="text-[20px] font-bold max-w-[300px]">
            {stackProjectsArray[index].projectName}
          </h1>
          <div className="flex gap-7">
            <a href={stackProjectsArray[index].weblink} target="_blank">
              <button className="w-[95px] h-[50px] border rounded-3xl font font-medium">
                Live Demo
              </button>
            </a>

            <a href={stackProjectsArray[index].github} target="_blank">
              <button className="w-[95px] h-[50px] border rounded-3xl font font-medium">
                Github
              </button>
            </a>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Projects;
