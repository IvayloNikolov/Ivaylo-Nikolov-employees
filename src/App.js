import "./App.css";
import React, { useState } from "react";
import pairTopTwoEmployees from "./utils/helpers";

function App() {
  const [file, setFile] = useState();
  const [pair, setPair] = useState();
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        setPair(pairTopTwoEmployees(csvOutput));
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <input type="file" accept=".csv" onChange={handleOnChange} />
      <button
        onClick={(e) => {
          handleOnSubmit(e);
        }}
      >
        Import CSV
      </button>

      {pair && (
        <table className="output-table">
          <thead>
            <tr>
              <th>Employee Id 1</th>
              <th>Employee Id 2</th>
              <th>Projects</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pair.employee1}</td>
              <td>{pair.employee2}</td>
              <td>{pair.projectIds.join()}</td>
              <td>{formatDuration(pair.duration)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

function formatDuration(duration) {
  if (duration) {
    return duration;
  } else {
    return "Colleagues have worked on same project but no overlapse in time";
  }
}

export default App;
