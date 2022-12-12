import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../Redux/Slice/TodoSlice";
const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.updateFilterStatus);
  const dispatch = useDispatch();

  // Update filter
  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };
  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add-Task
      </Button>
      
      {/* Select filter option */}
      <SelectButton value={filterStatus} onChange={updateFilter}>
        <option value="all">ALl</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AppHeader;
