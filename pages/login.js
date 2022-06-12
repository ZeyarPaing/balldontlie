import styles from "../styles/Login.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/authActions";
import { useRouter } from "next/router";

const Login = () => {
  const username = useState("");
  const password = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const router = useRouter();

  function handleInputChange(e, setState) {
    setState(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    dispatch(login(username[0], password[0]));
  }

  useEffect(() => {
    if (authState.authenticated) {
      router.replace("/players");
    }
  }, [authState]);
  return (
    <main className={styles.page}>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.formGp}>
            <label>Username</label>
            <input
              value={username[0]}
              onChange={(e) => handleInputChange(e, username[1])}
              type="text"
              aria-label="username"
            />
          </div>
          <div className={styles.formGp}>
            <label>Password</label>
            <input
              value={password[0]}
              onChange={(e) => handleInputChange(e, password[1])}
              type="password"
              aria-label="password"
            />
          </div>
          <button className="primary-btn">Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
