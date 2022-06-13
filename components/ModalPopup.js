import styles from "../styles/Modal.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, updateTeam } from "../store/actions/teamActions";
import Image from "next/image";
import { toast } from "react-toastify";

const ModalPopup = ({ type, onClose, prevData }) => {
  const [teamName, setName] = useState(prevData?.name || "");
  const [country, setCountry] = useState(prevData?.country || "");
  const [region, setRegion] = useState(prevData?.region || "");
  const [playerCount, setPlayerCount] = useState(prevData?.playerCount || 0);
  const [players, setPlayers] = useState(prevData?.players || []);
  const [errors, setErrors] = useState({
    name: null,
    country: null,
    region: null,
    playerCount: null,
  });
  const teamState = useSelector((state) => state.team);
  const dispatch = useDispatch();

  //Form validation
  function isValid() {
    return (
      teamName && country && region && playerCount >= 1 && !errors.teamName
    );
  }

  function handleNameInput(e) {
    let userInput = e.target.value;
    setName(userInput);
  }

  function handleCountryInput(e) {
    let userInput = e.target.value;
    setCountry(userInput);
  }

  function handleRegionInput(e) {
    let userInput = e.target.value;
    setRegion(userInput);
  }

  function handleCountInput(e) {
    let userInput = +e.target.value;
    setPlayerCount(userInput);
  }

  function removePlayer(player) {
    let idx = players.indexOf(player);
    if (idx !== -1) {
      let playersClone = [...players];
      playersClone.splice(idx, 1);
      setPlayers(playersClone);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let res = dispatch(
      type === "create"
        ? createTeam(
            {
              name: teamName.trim(),
              country,
              region,
              players: [],
              playerCount,
            },
            teamState
          )
        : updateTeam(
            {
              name: teamName.trim(),
              country,
              region,
              players,
              playerCount,
            },
            prevData,
            teamState
          )
    );
    if (res.success) {
      toast.success("Successfully " + type + "d.");
      onClose();
    } else {
      setErrors({ ...res.error });
    }
  }

  return (
    <div className={styles.modalBackdrop}>
      <section>
        <a href="#" onClick={onClose} className={styles.closeIcon}>
          <Image src="/close.svg" width={24} height={24} />
        </a>
        <h3>{type === "create" ? "Create Team" : "Update Team"}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGp}>
            <label>Team Name</label>
            <input value={teamName} onChange={handleNameInput} type="text" />
            <small>{errors.name || ""}</small>
          </div>
          <div className={styles.formGp}>
            <label>Country</label>
            <input value={country} onChange={handleCountryInput} type="text" />
            <small>{errors.country || ""}</small>
          </div>
          <div className={styles.formGp}>
            <label>Region</label>
            <input value={region} onChange={handleRegionInput} type="text" />
            <small>{errors.region || ""}</small>
          </div>
          <div className={styles.formGp}>
            <label>(Max) Player Count</label>
            <input
              value={playerCount}
              onChange={handleCountInput}
              type="number"
              min={1}
            />
            <small>{errors.playerCount || ""}</small>
          </div>
          {type === "update" && (
            <div className={styles.formGp}>
              <label>Players</label>
              <div className={styles.memberContainer}>
                {players.length ? (
                  players.map((player, idx) => (
                    <div className={styles.member} key={idx}>
                      <span>
                        {player.first_name} {player.last_name}
                      </span>
                      <Image
                        onClick={() => removePlayer(player)}
                        src="/close.svg"
                        width={16}
                        height={16}
                      />
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyContainer}>No members yet.</div>
                )}
              </div>
            </div>
          )}
          {/*<div className={styles.formGp}>*/}
          {/*  <label>Add Players</label>*/}
          {/*  <div className={styles.memberContainer}></div>*/}
          {/*</div>*/}
          <button disabled={!isValid()} className="primary-btn">
            {type === "create" ? "Create " : "Update "}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ModalPopup;
