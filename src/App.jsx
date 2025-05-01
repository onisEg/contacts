import toast, { Toaster } from "react-hot-toast";
import MasterLayout from "./components/MasterLayout/MasterLayout";
function App() {
  return (
    <>
      <Toaster />
      <div className="overlay py-5">
        <MasterLayout />
      </div>
      
    </>
  );
}

export default App;
