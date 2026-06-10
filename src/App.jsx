import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlanBeforeWriting from "./pages/PlanBeforeWriting";
import WriteEssay from "./pages/WriteEssay";
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<PlanBeforeWriting />} />
          <Route path="/write-essay" element={<WriteEssay />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;