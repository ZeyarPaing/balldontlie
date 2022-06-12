import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/actions/playerActions";
import Layout from "../components/Layout";
import styles from "../styles/Players.module.scss";
import Player from "../components/Player";
import ScrollDetector from "../components/ScrollDetector";

export default function Players() {
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.player);
  useEffect(() => {
    dispatch(fetchPlayers(playerState.page, playerState.limit));
  }, []);

  function handleScrollEnd() {
    console.log("scroll invoke");
    playerState.canLoadMore &&
      dispatch(fetchPlayers(playerState.page, playerState.limit));
  }

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Players</h1>
        <ScrollDetector onScrollEnd={handleScrollEnd}>
          <section className={styles.playersContainer}>
            {playerState.players.map((player) => (
              <Player player={player} key={player.id} />
            ))}
            {playerState.canLoadMore ? (
              Array(3)
                .fill(0)
                .map((e, idx) => <Player key={idx} skeleton={true} />)
            ) : (
              <></>
            )}
          </section>
        </ScrollDetector>
      </div>
    </Layout>
  );
}
