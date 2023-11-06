import styles from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.home}>
      <div className="container">
        <div className={styles.home__wrapper}>
            <button onClick={() => navigate('/login')}>LOGIN</button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
