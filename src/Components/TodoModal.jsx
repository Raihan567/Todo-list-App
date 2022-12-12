import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../Redux/Slice/TodoSlice";
import { v4 as uuid, v4 } from "uuid";
import toast from "react-hot-toast";

const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  // useEffect type checked
  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  // Handle type checked
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please Enter a Title");
      return;
    }
    if (title && status) {
      // add type checked
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added successfully");
      }

      // update type checked
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
          console.log({ title, status });
          toast.success("Todo updated successfully");
        } else {
          toast.error("No Change made");
          return;
        }
      }
      setModalOpen(false);
    }
  };
  return (
    <div>
      {modalOpen && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <motion.div
              whileTap={{ scale: 1.3 }}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
              className={styles.closeButton}
            >
              <MdOutlineClose />
            </motion.div>

            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
              <h1 className={styles.formTitle}>
                {type === "update" ? "Update" : "Add"} Task
              </h1>
              
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="completed">Completed</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </label>

              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "update" ? "Update" : "Add"} Task
                </Button>
                <Button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoModal;
