import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateWallet from "./components/createwallet/createwallet";
import PrivateKey from "./components/privatekey";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreateWallet />} />
          <Route path="/about" element={<PrivateKey />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
