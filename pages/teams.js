import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import styles from "../styles/Team.module.scss";
import ModalPopup from "../components/ModalPopup";
import Team from "../components/Team";

export default function Teams() {
  const teamState = useSelector((state) => state.team);
  const [modalType, setModalType] = useState(null);
  const [teamData, setTeamData] = useState({});
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  function handleEdit(currentData) {
    setTeamData(currentData);
    setModalType("update");
  }

  return (
    <Layout>
      <section className="container">
        <div className={styles.teamsHeader}>
          <h1 className="title">Teams</h1>
          <div>
            <button
              className="primary-btn"
              onClick={() => setModalType("create")}
            >
              Create Team
            </button>
          </div>
        </div>
        {modalType && (
          <ModalPopup
            type={modalType}
            prevData={teamData}
            onClose={() => setModalType(null)}
          />
        )}
        {render && (
          <section className={styles.teamsContainer}>
            {teamState.teams.length
              ? teamState.teams.map((team) => (
                  <Team key={team.name} team={team} onEdit={handleEdit} />
                ))
              : "No teams yet, create one."}
          </section>
        )}
      </section>
    </Layout>
  );
}
