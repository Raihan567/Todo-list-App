import React from "react";
import { useSelector } from "react-redux";

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  console.log(sortedTodoList);
  return <div>AppContent</div>;
};

export default AppContent;
