import { useEffect, useState } from "react";

import Header from "./components/Header";
import Modal from "./components/Modal";
import StudentDetails from "./pages/studentDetails";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  const [data, setData] = useState({});
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  useEffect(function () {
    setSearchedData(JSON.parse(localStorage.getItem("studentDetails")));
  }, []);

  function handleAddClick() {
    setIsModelOpen(true);
  }

  function handleCloseModal() {
    setIsModelOpen(false);
  }

  return (
    <>
      <Header handleAddClick={handleAddClick} />
      <Routes>
        <Route
          index
          path="/"
          element={
            <Home
              data={data}
              searchedData={searchedData}
              setSearchedData={setSearchedData}
              setData={setData}
            />
          }
        />
        <Route path="/details/:id" element={<StudentDetails />} />
      </Routes>
      {isModelOpen && (
        <Modal
          handleCloseModal={handleCloseModal}
          setSearchedData={setSearchedData}
        />
      )}
    </>
  );
}
