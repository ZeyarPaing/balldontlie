import styles from "../styles/Players.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addMemberPlayer } from "../store/actions/teamActions";

const Player = ({ player, skeleton }) => {
  const teamState = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const [showPopover, setShowPopover] = useState(false);

  function handleAdd(team) {
    setShowPopover(false);
    let res = dispatch(addMemberPlayer(team, player));
    console.log("res ; res : ", res);
  }

  if (skeleton) {
    return <div className={`${styles.playerSkeleton} ${styles.player}`} />;
  }
  return (
    <div className={styles.player}>
      <h3>
        {player.first_name} {player.last_name}
      </h3>
      <span>Position</span>
      <span className={styles.position}>{player.position || "N/A"}</span>
      <hr />
      <div className={styles.team}>
        <h4>{player.team.full_name}</h4>
        <span className={styles.position}>{player.team.abbreviation}</span>
        <p>@{player.team.city}</p>
        <p>
          {player.team.conference} {player.team.division}
        </p>
        <div className={styles.btnWrap}>
          <button
            onClick={() => setShowPopover(!showPopover)}
            className="primary-btn"
          >
            Add to
          </button>
          {showPopover && (
            <div className={styles.teamsPopover}>
              {teamState.teams.map((team) => (
                <a onClick={() => handleAdd(team)} key={team.name}>
                  {team.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
