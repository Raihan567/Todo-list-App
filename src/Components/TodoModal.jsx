import React, { useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addTodo } from "../Redux/Slice/TodoSlice";
import { v4 as uuid, v4 } from "uuid";
import toast from "react-hot-toast";

const TodoModal = ({ modalOpen, setModalOpen }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  const dispatch = useDispatch();
  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, status });
    if (title && status) {
      dispatch(
        addTodo({
          id: uuid(),
          title,
          status,
          time: new Date().toLocaleString(),
        })
      );
      toast.success("Task Added successfully");
      setModalOpen(false);
      setTitle("");
    } else {
      toast.error("Title should not be empty");
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
              <h1 className={styles.formTitle}>Add task</h1>
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
                  Add Task
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
