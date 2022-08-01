import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
// import ListStudents from "./components/ListStudents";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {/* <ListStudents /> */}
        <Outlet />
      </main>
    </>
  );
}

export default App;
