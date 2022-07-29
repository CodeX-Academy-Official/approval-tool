import React from "react";
import Navbar from "./Navbar";
import ListStudents from "./ListStudents";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main style={{ backgroundColor: "#E0E0E0" }}>
        <ListStudents />
      </main>
    </>
  );
}

export default App;
