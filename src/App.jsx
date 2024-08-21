import Header from "./components/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";

function App() {
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
