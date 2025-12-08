import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesPage from "./pages/SalesPage";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <Routes>
          <Route path="/" element={<SalesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
