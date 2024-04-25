import Header from "./components/Header";
import Cards from "./components/Cards";

import { Routes, Route } from "react-router-dom";
import CardDetails from "./components/CardDetails";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardDetails />} />
      </Routes>
    </div>
  );
}

export default App;
