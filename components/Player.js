import styles from "../styles/Players.module.scss";

const Player = ({ player, skeleton }) => {
  if (skeleton) {
    return (
      <div className={`${styles.playerSkeleton} ${styles.player}`}>
        <h3></h3>
        <span></span>
        <hr />
        <p></p>
        <div className={styles.team}>
          <h4></h4>
          <p></p>
          <p></p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.player}>
      <h3>
        {player.first_name} {player.last_name}
      </h3>
      <span>Position</span>
      <span className={styles.position}>{player.position || "N/A"}</span>
      <hr />
      <p>TEAM</p>
      <div className={styles.team}>
        <h4>{player.team.full_name}</h4>
        <span className={styles.position}>{player.team.abbreviation}</span>
        <p>@{player.team.city}</p>
        <p>
          {player.team.conference} {player.team.division}
        </p>
      </div>
    </div>
  );
};

export default Player;
