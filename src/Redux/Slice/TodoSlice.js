import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  // getting todo list
  const localStorage = window.localStorage.getItem("todoList");
  // if todo list is not empty
  if (localStorage) {
    return JSON.parse(localStorage);
  }
  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

// initial the todo state
const initialState = {
  todoList: getInitialTodo(),
};

//  todo create slice
const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);

      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });

        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      }
    },
  },
});

export const { addTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
