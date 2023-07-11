import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import delete_logo from "./icons/delete.png";
import eye_logo from "./icons/eye.png";
import pen_logo from "./icons/pen.png";
import comp_logo from "./icons/comp.png";

function App() {
  const [bigTasks, setBigTasks] = useState([]);
  const [smallTasks, setSmallTasks] = useState([]);
  const [name, setName] = useState("a");
  const [smallTaskName, setSmallTaskName] = useState("a");
  const [choosenID, setChoosesnID] = useState("");
  const [indexx, setIndex] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/getBigTasks").then((response) => {
      setBigTasks(response.data);
    });
  }, [bigTasks, bigTasks.length, smallTasks]);

  useEffect(() => {
    bigTasks.map((smalltask) => {
      smalltask._id == choosenID ? setSmallTasks(smalltask.list) : null;
    });
  }, [choosenID]);
  const createBigTask = () => {
    Axios.post("http://localhost:3001/createBigTask", { name }).then(
      setBigTasks([...bigTasks, { name }])
    );
  };

  const deleteBigTask = (id) => {
    Axios.delete(`http://localhost:3001/deleteBigTask/${id}`).then(
      setBigTasks(
        bigTasks.filter((val) => {
          return val._id != id;
        })
      )
    );
  };
  const showSmallTasks = (id) => {
    setChoosesnID(id);
  };

  const createSmallTask = () => {
    let name = smallTaskName;
    let id = choosenID;
    // console.log(name, id);
    Axios.put("http://localhost:3001/addSmallTask", {
      name,
      id,
    }).then(setSmallTasks((oldarray) => [...oldarray, smallTaskName]));
  };

  // const getIndex = (index) => {
  //   // setIndex(index);
  // };

  const deleteSmallTask = (index) => {
    var idd = choosenID;
    setIndex(index);
    Axios.put("http://localhost:3001/deleteSmallTask", {
      id: choosenID,
      index: index,
    }).then(
      setSmallTasks((oldarray) => {
        oldarray[index] = "null";
        return oldarray;
      })
    );
  };

  const updateSmallTask = (index) => {
    setIndex(index);
    const newName = prompt("enter new todo");
    console.log(index);

    Axios.put("http://localhost:3001/updateSmallTask", {
      name: newName,
      id: choosenID,
      index: index,
    }).then(
      setSmallTasks((oldarray) => {
        oldarray[index] = newName;
        return oldarray;
      })
    );
  };

  const updatedeTask = (id) => {
    console.log(bigTasks);
    const newName = prompt("enter new todo");

    Axios.put("http://localhost:3001/updateBigTask", {
      id,
      newName,
    }).then(
      setBigTasks(
        bigTasks.map((val) => {
          return val._id == id ? (val.name = newName) : val;
        })
      )
    );
    console.log(bigTasks);

    // .then(
    // setlistOfToDos(
    //   listOfUsers.map((val) => {
    //     return val._id == id ? { _id: id, name: val.name } : val;
    //   })
    // )
    // );
  };

  const completeTask = (id) => {
    Axios.put("http://localhost:3001/completeBigTask", { id }).then();
  };
  return (
    <>
      <header>TODO APP</header>
      <div className="all">
        <div className="bigtasks">
          <div className="bigtaskinput">
            <input
              type="text"
              placeholder="..."
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <button onClick={createBigTask}>create Big Task</button>
          </div>
          {bigTasks.map((bigtask) => {
            return (
              <div
                className={bigtask._id == choosenID ? "activated-list" : "list"}
              >
                <h3 className={bigtask.completed == true ? "completed" : ""}>
                  {" "}
                  {bigtask.name}
                </h3>
                <button
                  onClick={() => {
                    completeTask(bigtask._id);
                  }}
                >
                  <img className="logo" src={comp_logo} alt="" />
                </button>
                <button
                  onClick={() => {
                    updatedeTask(bigtask._id);
                  }}
                >
                  <img className="logo" src={pen_logo} alt="" />{" "}
                </button>
                <button
                  onClick={() => {
                    deleteBigTask(bigtask._id);
                  }}
                >
                  <img className="logo" src={delete_logo} alt="" />
                </button>
                <button
                  onClick={() => {
                    showSmallTasks(bigtask._id);
                  }}
                >
                  <img className="logo" src={eye_logo} alt="" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="smalltask">
          <div className="smalltakiput">
            <input
              type="text"
              placeholder="..."
              onChange={(event) => {
                setSmallTaskName(event.target.value);
              }}
            />

            <button onClick={createSmallTask}>create small Task</button>
          </div>
          {smallTasks.map((smalltask, index) => {
            return (
              <div className="smalltasklist">
                {/* <div className="line"> </div> */}

                {smalltask == "null" ? null : (
                  <div className="ind-smal-task">
                    {smalltask}

                    <button
                      onClick={() => {
                        deleteSmallTask(index);
                      }}
                    >
                      <img className="logo" src={delete_logo} alt="" />
                    </button>
                    <button
                      onClick={() => {
                        updateSmallTask(index);
                      }}
                    >
                      <img className="logo" src={pen_logo} alt="" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
