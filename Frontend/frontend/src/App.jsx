import { useState, useEffect } from "react";
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

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes();
      });
  }

  function handleDeleteNote(noteId) {
    prompt("Enter New Desctiption");
    axios.delete("http://localhost:3000/api/notes/" + noteId).then(() => {
      fetchNotes();
    });
  }

  function noteEditHandler(noteId) {
    const newDescription = prompt("Enter new description");

    axios
      .patch(`http://localhost:3000/api/notes/${noteId}`, {
        description: newDescription,
      })
      .then(() => {
        setnotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId
              ? { ...note, description: newDescription }
              : note,
          ),
        );
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="note-create-form">
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h2>{note.title}</h2>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  noteEditHandler(note._id);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;

// Jab tak hum useeffect ka use nahi karrhe the tab tab App component rerender ho rrha tha kyuki state jabhi chnges hoga component usse render karayga - ye loop continously chalu rheta hai isliye hum useEffect use karte hai - kyuki useEffect API ko ek hi baar call karega and hr componenet ke render pr vo API call nahi karega
