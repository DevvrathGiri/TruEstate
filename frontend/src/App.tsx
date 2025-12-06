import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesPage from "./pages/SalesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
