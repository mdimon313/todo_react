import React from "react";
import { FiTrash } from "react-icons/fi";

function ShowList({ todos, toggleComplete, deleteTodo }) {
  const style = {
    li: `flex items-center bg-slate-200 dark:bg-slate-600 border dark:border-slate-400 p-4 rounded-md my-2 hover:dark:bg-slate-500 hover:dark:border-slate-600 transition-all`,
    liCompleted: `flex items-center bg-slate-200 dark:bg-slate-700 border dark:border-slate-700 p-4 rounded-md my-2`,
    text: `w-full px-2 cursor-pointer text-slate-900 dark:text-white`,
    textCompleted: `w-full px-2 cursor-pointer line-through text-slate-900 dark:text-white`,
    button: `text-2xl text-red-700`,
    footer: `text-center text-slate-800 dark:text-white text-lg font-medium py-2 capitalize`,
  };
  return (
    <>
      <ul className="mt-3">
        {todos.map((todo, index) => {
          return (
            <li
              key={index}
              className={todo.completed ? style.liCompleted : style.li}
            >
              <input
                type="checkbox"
                onChange={() => toggleComplete(todo)}
                checked={todo.completed}
                className="text-ellipsis"
              />
              <p
                className={todo.completed ? style.textCompleted : style.text}
                onClick={() => toggleComplete(todo)}
              >
                {todo.todo}
              </p>
              <button
                className={style.button}
                type="button"
                onClick={() => deleteTodo(todo.id)}
              >
                <FiTrash />
              </button>
            </li>
          );
        })}
      </ul>
      {todos.length < 1 ? null : (
        <p className={style.footer}>You have {todos.length} todos</p>
      )}
    </>
  );
}

export default React.memo(ShowList);
