import { useContext, useState } from "react";
import styles from "./LoginPage.module.scss";
import request from "../../server/request";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/isAuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setIsAuth } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    request
      .post("api/v1/auth/login", user)
      .then((res) => {
        setIsAuth(true);
        navigate("/admin/dashboard");
        Cookies.set("token", res.data.token);
      })
      .then((err) => console.log(err));
  };
  return (
    <section className={styles.login}>
      <div className="container">
        <div className={styles.login__wrapper}>
          <h1>Login</h1>
          <form action="" onSubmit={(e) => submitForm(e)}>
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
