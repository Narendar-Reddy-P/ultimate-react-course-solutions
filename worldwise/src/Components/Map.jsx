import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./map.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  //progamatic navigation-imperative navigation as we don't use LINK
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h1>
        Position: {lat},{lng}
      </h1>
    </div>
  );
}
