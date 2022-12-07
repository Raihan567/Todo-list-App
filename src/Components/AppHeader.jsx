import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add-Task
      </Button>

      {/* <input
        className={styles.appHeader__searchFilter}
        type="text"
        placeholder="Search"
      /> */}

      <SelectButton>
        <option value="all">ALl</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </SelectButton>
      <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AppHeader;
