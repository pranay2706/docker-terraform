import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailTabel({ data, searchedData, setSearchedData }) {
  const navigate = useNavigate();

  const [renderedData, setRenderedData] = useState([]);

  function handleClick(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    if (data.searchQuery) {
      const filteredData = searchedData.filter((student) =>
        student.name.toLowerCase().includes(data.searchQuery.toLowerCase())
      );
      setRenderedData(filteredData);
    } else if (data.sortQuery) {
      if (data.sortQuery.toLowerCase() === "sort by id") {
        const sortedData = [...searchedData].sort(
          (a, b) => parseInt(a.id) - parseInt(b.id)
        );
        setRenderedData(sortedData);
      }
      if (data.sortQuery.toLowerCase() === "sort by phone number") {
        const sortedData = [...searchedData].sort((a, b) => {
          const phoneA = parseInt(a.phone.replace(/-/g, ""));
          const phoneB = parseInt(b.phone.replace(/-/g, ""));
          return phoneB - phoneA;
        });
        setRenderedData(sortedData);
      }
    } else {
      setRenderedData(JSON.parse(localStorage.getItem("studentDetails")));
    }
  }, [data]);

  const renderAsCards = () => {
    return (
      <div className="grid grid-cols-1 w-full gap-4 p-4">
        {renderedData.map((data) => (
          <div
            key={data.id}
            className="bg-custom-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-light-gray"
          >
            <div onClick={() => handleClick(data.id)}>
              <h2 className="text-xl font-bold">{data.name}</h2>
              <p className="text-custom-black">{data.email}</p>
              <p className="text-custom-black">{data.phone}</p>
              <p className="text-custom-black">{data.city}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAsTable = () => {
    return (
      <div className="p-5 w-full">
        <table className="table-auto border-collapse border w-full">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="head">id</th>
              <th className="head">name</th>
              <th className="head">email</th>
              <th className="head">phonenumber</th>
              <th className="head">city</th>
            </tr>
          </thead>
          <tbody>
            {renderedData.map((data) => (
              <tr key={data.id}>
                <td className="head">{data.id}</td>
                <td
                  className="head bg-white cursor-pointer hover:bg-light-gray"
                  onClick={() => handleClick(data.id)}
                >
                  {data.name}
                </td>
                <td className="head">{data.email}</td>
                <td className="head">{data.phone}</td>
                <td className="head">{data.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {renderedData.length !== 0 ? (
        // <div className="flex">
        //   {window.innerWidth < 640 ? renderAsCards() : renderAsTable()}
        // </div>
        <div>
          <div className="md:hidden">{renderAsCards()}</div>
          <div className="hidden md:block">{renderAsTable()}</div>
        </div>
      ) : (
        <p className="flex justify-center items-center mt-5">
          No Student Found With This Name
        </p>
      )}
    </>
  );
}
