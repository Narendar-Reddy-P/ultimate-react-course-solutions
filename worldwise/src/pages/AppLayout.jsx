import Sidebar from "../Components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../Components/map";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
