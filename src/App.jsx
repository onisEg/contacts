import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MasterLayout from "./components/MasterLayout/MasterLayout";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="overlay py-5">
        <MasterLayout />
      </div>
    </>
  );
}

export default App;
