import "@/App.css";
// import Pa1 from "@/pages/Pa1";
import { BrowserRouter as Router, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="app-container">
      <h1>Plankton</h1>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Start />} />
        <Route path="*" element={<Error />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
