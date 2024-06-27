import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateWallet from "./components/createwallet/createwallet";
import PrivateKey from "./components/privatekey";
import CreatePrivateKey from "./components/createkey";
import HomePage from "./components/homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreateWallet />} />
          <Route path="/enter-key" element={<PrivateKey />} />
          <Route path="/key" element={<CreatePrivateKey />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
