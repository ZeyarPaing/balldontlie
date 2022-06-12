import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPlayers} from "../store/actions/playerActions";
import Layout from "../components/Layout";
import styles from "../styles/Players.module.scss";
import Player from "../components/Player";

export default function Players() {
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.player);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPlayers());
    }, 1000);
  }, []);
  return (
      <Layout>
        <div className="container">
          <section className={styles.playersContainer}>
            {
              playerState.players.map(player => (
                  <Player player={player} key={player.id}/>
              ))
            }
          </section>
        </div>

      </Layout>
  );
}
