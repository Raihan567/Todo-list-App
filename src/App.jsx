import { Toaster } from "react-hot-toast";
import "./App.css";
import AppContent from "./Components/AppContent";
import AppHeader from "./Components/AppHeader";
import PageTitle from "./Components/PageTitle";
import styles from "./styles/modules/app.module.scss";
function App() {
  return (
    <>
      <div className="container">
        <PageTitle>TODO APP </PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader></AppHeader>
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.6rem",
          },
        }}
      />
    </>
  );
}

export default App;
