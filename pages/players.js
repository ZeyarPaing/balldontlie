import { useEffect, useState } from "react";
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
    !playerState.players.length && debounceFetch(50); //to prevent strict mode call twice useEffect
  }, []);

  function handleScrollEnd() {
    dispatch(fetchPlayers());
  }

  let handler;

  function debounceFetch(t = 800) {
    clearTimeout(handler);
    handler = setTimeout(function () {
      handleScrollEnd();
    }, t);
  }

  function addBtnClickHandler(player) {
    console.log("palyer : ", player);
  }

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Players</h1>
        <ScrollDetector onScrollEnd={debounceFetch}>
          <section className={styles.playersContainer}>
            {playerState.players.map((player, idx) => (
              <Player
                player={player}
                key={player.first_name + player.id + idx}
              />
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
