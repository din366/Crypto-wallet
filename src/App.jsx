import Header from "./components/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import {useInitialization} from "./features/useInitialization/useInitialization.js";

function App() {
  useInitialization();

  return (
    <>
      <Header />
      <MainWrapper/>
      <Footer />
    </>
  )
}

const MainWrapper = () => {
  return <Outlet />
};

export default App;
