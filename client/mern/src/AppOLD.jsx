import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [listOfToDos, setlistOfToDos] = useState([]);

  const [name, setName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getTodos").then((response) => {
      setlistOfToDos(response.data);
    });
  }, []);
  const createUser = () => {
    Axios.post("http://localhost:3001/createToDo", { name }).then(
      (response) => {
        setlistOfToDos([...listOfToDos, { name }]);
      }
    );
  };
  const addBigTask = () => {
    Axios.post("http://localhost:3001/addBigTask", {
      name,
    }).then((response) => {
      setlistOfToDos([...listOfToDos, { name }]);
    });
  };

  const updateUser = (id) => {
    const newToDo = prompt("enter new todo");
    Axios.put("http://localhost:3001/updateToDo", {
      newToDo: newToDo,
      id: id,
    });
    // .then(
    // setlistOfToDos(
    //   listOfUsers.map((val) => {
    //     return val._id == id ? { _id: id, name: val.name } : val;
    //   })
    // )
    // );
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/deleteToDo/${id}`).then(
      setlistOfToDos(
        listOfToDos.filter((val) => {
          return val._id != id;
        })
      )
    );
  };
  return (
    <>
      <div className="ALL">
        <div className="sidebar">
          {listOfToDos.map((bigTasks) => {
            return (
              <div>
                <h3> {bigTasks.name}</h3>
                <button onClick={addBigTask}>add bigTasks</button>
              </div>
            );
          })}
        </div>

        <div className="app">
          <div className="inputs">
            <input
              type="text"
              placeholder="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />

            <button onClick={createUser} className="button-28">
              add todo
            </button>
          </div>
          {listOfToDos.map((user) => {
            return (
              <div className="list">
                <h3> {user.list}</h3>

                <div>
                  <button
                    onClick={() => {
                      updateUser(user._id);
                    }}
                  >
                    update
                  </button>
                  <button
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
