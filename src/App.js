import React from "react";
import Navbar from "./components/Navbar";
import ListStudents from "./components/ListStudents";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <ListStudents />
      </main>
    </>
  );
}

export default App;
