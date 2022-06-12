import styles from "../styles/Team.module.scss";

const Team = ({ team, onDelete, onEdit }) => {
  function deleteTeam(e) {
    e.stopPropagation();
    onDelete(team.name);
  }

  return (
    <div onClick={() => onEdit(team)} className={styles.teamCard}>
      <h2>{team.name}</h2>
      <p>
        {team.region}, {team.country}
      </p>
      <p>Player Count - {team.playerCount}</p>
      <button onClick={deleteTeam}>Delete</button>
    </div>
  );
};

export default Team;
