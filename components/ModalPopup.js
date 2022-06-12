import styles from "../styles/Modal.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../store/actions/teamActions";
import Image from "next/image";

const ModalPopup = ({ type, onClose }) => {
  const [teamName, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [playerCount, setPlayerCount] = useState(0);
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

  function handleSubmit(e) {
    e.preventDefault();
    let res = dispatch(
      createTeam(
        {
          name: teamName,
          country: country,
          region: region,
          players: [],
          playerCount,
        },
        teamState
      )
    );
    if (res.success) {
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
            <input onChange={handleNameInput} type="text" />
            <small>{errors.name || ""}</small>
          </div>
          <div className={styles.formGp}>
            <label>Country</label>
            <input onChange={handleCountryInput} type="text" />
            <small>{errors.country || ""}</small>
          </div>
          <div className={styles.formGp}>
            <label>Region</label>
            <input onChange={handleRegionInput} type="text" />
            <small>{errors.region || ""}</small>
          </div>
          <div className={styles.formGp}>
            <label>Player Count</label>
            <input onChange={handleCountInput} type="number" min={1} />
            <small>{errors.playerCount || ""}</small>
          </div>
          {type === "update" && (
            <div className={styles.formGp}>
              <label>Players</label>
              <div className={styles.memberContainer}>
                <div className={styles.emptyContainer}>No members yet.</div>
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
