import React from "react";
import { useState } from "react";
import Sidebar from "./Components/SIdebar";
import Navbar from "./Components/Navbar";
import Contact from "./Components/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Deshboard from "./Components/Deshboard";
const App = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      <div className="h-screen bg-beige">
        <Navbar />
        <div className="flex ">
          <div
            className={` ${open ? "w-50% md:w-20% p-5" : "w-20% md:w-5% p-1"
              } bg-dark-gray min-h-[93vh] pt-8 relative duration-300`}
          >
            <Sidebar open={open} setOpen={setOpen} />
          </div>
          <div className={` ${open ? "w-80%" : "w-95%"}`}>
            <Routes>
              <Route path="/" element={<Deshboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;