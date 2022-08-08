import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AddForm from "./component/AddForm";
import ShowList from "./component/ShowList";
import db from "./Firebase";

function App() {
  const [todos, setTodos] = useState([]);

  // read
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubcribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return unsubcribe;
  }, []);

  // update

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="p-4 container mx-auto px-3 min-h-screen min-w-full  bg-slate-50 dark:bg-gray-700">
      <div className="bg-slate-300 dark:bg-slate-600 w-full md:w-[500px] mx-auto p-4 rounded-md shadow-xl ">
        <AddForm />
        <ShowList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default React.memo(App);
