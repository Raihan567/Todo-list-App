import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.scss";
const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  // console.log(sortedTodoList);
  const filterTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });
  
  // console.log(filterTodoList)
  return (
    <div className={styles.content__wrapper}>
      {filterTodoList && filterTodoList.length > 0
        ? filterTodoList.map((todo) => <TodoItem todo={todo} key={todo.id} />)
        : <p className={styles.emptyText}>No todo's found</p>}
    </div>
  );
};

export default AppContent;
