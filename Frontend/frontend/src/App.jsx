import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        toast.success("Note created successfully");
        title.value = "";
        description.value = "";
      });
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then(() => {
      fetchNotes();
      toast.success("Note Deleted Successfully", {
        style: {
          backgroundColor: "red",
        },
      });
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
        toast.success("Note Updated Successfully", {
          style: {
            backgroundColor: "orange",
          },
        });
      });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <form onSubmit={handleSubmit} className="note-create-form">
        <h1>Create Note</h1>
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
                className="delete"
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
              <button
                className="edit"
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
