import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { ImBin2 } from "react-icons/im";
import { FaRegCircle,FaRegCheckCircle } from "react-icons/fa";


function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL);
      setTodos(res.data); 
    } catch (err) {
      console.error("Error fetching todos:", err);
      setTodos([]); 
    }
  };
  

  const addTodo = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL, {
        task,
        status: false,
      });
      setTodos([...todos, res.data]);
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id, status) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, {
        status: !status,
      });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="w-screen h-screen p-12 bg-blue-200">
    <div className=" mx-auto h-full w-full md:w-3/4 lg:w-1/2 p-8 bg-white rounded-3xl drop-shadow-lg">
      <h1 className="text-3xl mb-4 font-bold ">Todo List </h1>
      <div className="flex bg-gray-300 rounded-full">
        <input
          className="p-3 pl-5 rounded-full text-lg focus:outline-none focus:ring-0 w-full focus:none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          
        />
        <button className="bg-blue-500 w-24 rounded-full text-white p-3 hover:bg-blue-600  active:bg-blue-700" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="mt-4">
        {todos.map(({ _id, task, status }) => (
          <li key={_id} className="flex justify-between p-2 gap-3 text-xl">
            <button className={`${status ? "text-green-500" : "text-black"} hover:scale-105`} onClick={() => toggleTodo(_id, status)}>
            {status ? <FaRegCheckCircle /> : <FaRegCircle />}
            </button>
            <span
              className={`${status ? "line-through" : ""} w-full overflow-hidden`}
            >
              {task}
            </span>
            <button className="text-red-500 hover:text-red-600 hover:scale-105" onClick={() => deleteTodo(_id)}>
            <ImBin2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
