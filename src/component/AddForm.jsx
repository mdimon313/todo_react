import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import db from "../Firebase";

function AddForm() {
  const [inputValue, setInputValue] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();

    if (inputValue === "") {
      alert("you can't add empty!");
      return;
    } else {
      // Add a new document with a generated id.
      await addDoc(collection(db, "todos"), {
        todo: inputValue,
        completed: false,
      });
      setInputValue("");
    }
  };

  const style = {
    heading: `text-center mb-3 capitalize text-3xl font-bold text-slate-700 dark:text-slate-200`,
    form: `flex items-cener justify-between`,
    input: `w-full p-2 rounded-md border border-gray-400 bg-slate-300 dark:bg-slate-500 focus:outline-none text-gray-800 dark:text-white`,
    button: `ml-3 bg-slate-400 dark:bg-slate-500 px-4 rounded-md text-white cursor-pointer hover:bg-slate-400 transition-all text-2xl`,
  };

  return (
    <>
      <h1 className={style.heading}>Todo</h1>
      <form onSubmit={addTodo} className={style.form}>
        <input
          type="text"
          placeholder="Add Todo..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className={style.input}
        />
        <button type="submit" className={style.button}>
          +
        </button>
      </form>
    </>
  );
}

export default React.memo(AddForm);
