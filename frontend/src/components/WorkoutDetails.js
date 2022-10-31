import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState();
  const [load, setLoad] = useState();
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleEdit = async () => {
    if (!user) {
      return;
    }

    const data = { title, reps, load };

    const response = await fetch("/api/workouts/" + workout._id, data, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "EDIT_WORKOUT", payload: json });
    }
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <div className="titleDiv">
        <h4 onChange={(e) => setTitle(e.target.value)}>{workout.title}</h4>
        <span className="delSpan" onClick={handleClick}>
          delete
        </span>
        <span className="editSpan" onClick={handleEdit}>
          edit
        </span>
      </div>
      <p onChange={(e) => setLoad(e.target.value)}>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p onChange={(e) => setReps(e.target.value)}>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default WorkoutDetails;
