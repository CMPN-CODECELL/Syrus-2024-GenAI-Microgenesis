import { useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    const getAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/send-alert");
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAlerts();
  }, []);

  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;

//https://github.com/CMPN-CODECELL/Syrus-2024-GenAI-Microgenesis
