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
  filterStatus: "all",
  todoList: getInitialTodo(),
};

//  todo create slice
const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // add reducers
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

    // Delete Reducer
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },

    // Update Reducer
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList === todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  TodoSlice.actions;

export default TodoSlice.reducer;
