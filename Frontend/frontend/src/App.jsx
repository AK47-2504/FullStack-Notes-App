import { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setnotes] = useState([
    {
      title: "Test 1",
      description: "Description 1",
    },
    {
      title: "Test 2",
      description: "Description 2",
    },
    {
      title: "Test 3",
      description: "Description 3",
    },
    {
      title: "Test 4",
      description: "Description 4",
    },
  ]);

  axios.get("http://localhost:3000/api/notes")
  .then((res) => {
    setnotes(res.data.notes)
  })

  return (
    <>
      <div className="notes">
        {notes.map((elem, idx) => {
          return (
            <div key={idx} className="note">
              <h2>{elem.title}</h2>
              <p>{elem.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
