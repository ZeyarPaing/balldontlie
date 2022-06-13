import styles from "../styles/Team.module.scss";
import Confirm from "./Confirm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTeam } from "../store/actions/teamActions";

const Team = ({ team, onEdit }) => {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  function deleteHandler(e) {
    e.stopPropagation();
    setDeleteConfirm(true);
  }

  function performDelete() {
    dispatch(deleteTeam(team.name));
  }

  return (
    <>
      <div onClick={() => onEdit(team)} className={styles.teamCard}>
        <h2>{team.name}</h2>
        <p>
          {team.region}, {team.country}
        </p>
        <p>Player Count - {team.players.length}</p>
        <p>Player Count (Max) - {team.playerCount}</p>
        <button onClick={deleteHandler}>Delete</button>
      </div>
      {deleteConfirm && (
        <Confirm
          title="Are you sure?"
          message="Do you really want to delete the team? All the information including players will be lost."
          okText="Delete"
          onConfirm={performDelete}
          onCancel={() => setDeleteConfirm(false)}
        />
      )}
    </>
  );
};

export default Team;
