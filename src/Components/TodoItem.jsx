import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../Redux/Slice/TodoSlice";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckBox from "./CheckBox";

const TodoItem = ({ todo }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.status === "completed") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "incomplete" : "completed",
      })
    );
  };
  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckBox checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "completed" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "p, dd/MM/yyyy")}
            </p>
          </div>
        </div>

        <div className={styles.todoActions}>
          <motion.div
            whileTap={{ scale: 1.3 }}
            className={styles.icon}
            onClick={handleDelete}
          >
            <MdDelete />
          </motion.div>
          <motion.div
            whileTap={{ scale: 1.3 }}
            className={styles.icon}
            onClick={handleUpdate}
          >
            <MdEdit />
          </motion.div>
        </div>
      </div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
};

export default TodoItem;
