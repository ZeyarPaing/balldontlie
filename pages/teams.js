import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/actions/playerActions";
import Layout from "../components/Layout";

export default function Teams() {
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.player);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPlayers());
      console.log("state  :", playerState);
    }, 1000);
  }, []);
  return (
    <Layout>
      <div>Hello world</div>
    </Layout>
  );
}
