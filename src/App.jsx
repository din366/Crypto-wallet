import Button from "./components/Button/Button.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <>
      <div>

      <Header></Header>
      <Button func={() => {alert('Click!')}} text={'sdfsdf'} />
      </div>

    </>
  )
}

export default App
