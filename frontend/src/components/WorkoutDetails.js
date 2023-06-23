import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [reps, setReps] = useState(workout.reps);
  const [load, setLoad] = useState(workout.load);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleEdit = async () => {
    if (!user) {
      return;
    }

    const data = { title, reps, load };

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "EDIT_WORKOUT", payload: json });
      setIsEditMode(false); // Exit edit mode after successful edit
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
      <div className="button-span clearfix">
        <span className="delSpan" onClick={handleClick}>
          delete
        </span>
        {isEditMode ? (
          <span className="editSpan" onClick={handleEdit}>
            save
          </span>
        ) : (
          <span className="editSpan" onClick={() => setIsEditMode(true)}>
            edit
          </span>
        )}
      </div>
      <div className="titleDiv">
        {isEditMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h4>{title}</h4>
        )}
      </div>
      <p>
        <strong>Load (kg): </strong>
        {isEditMode ? (
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        ) : (
          load
        )}
      </p>
      <p>
        <strong>Reps: </strong>
        {isEditMode ? (
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        ) : (
          reps
        )}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default WorkoutDetails;
