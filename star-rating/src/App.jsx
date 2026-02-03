import { useState } from "react";
import StarRating from "./StarRating";

export default function App() {
  return (
    <>
      <StarRating maxRating={5} />;
      <Test />
    </>
  );
}

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating
        color="blue"
        maxRating={10}
        onSetRating={setMovieRating}
      ></StarRating>
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}
