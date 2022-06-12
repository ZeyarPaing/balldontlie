import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import styles from "../styles/Team.module.scss";
import ModalPopup from "../components/ModalPopup";

export default function Teams() {
  const teamState = useSelector((state) => state.team);
  const [showModal, setShowModal] = useState(false);
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <Layout>
      <section className="container">
        <div className={styles.teamsHeader}>
          <h1 className="title">Teams</h1>
          <div>
            <button className="primary-btn" onClick={() => setShowModal(true)}>
              Create Team
            </button>
          </div>
        </div>
        {showModal && (
          <ModalPopup type={"create"} onClose={() => setShowModal(false)} />
        )}
        {render && (
          <section className={styles.teamsContainer}>
            {teamState.teams.length
              ? teamState.teams.map((team) => (
                  <div key={team.name}>{team.name}</div>
                ))
              : "No teams yet, create one."}
          </section>
        )}
      </section>
    </Layout>
  );
}
