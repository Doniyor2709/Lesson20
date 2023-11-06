import styles from "./NotificationCard.module.scss";
import {FaUserPlus} from 'react-icons/fa6'

const NotificationCard = ({ id, username, firstName, lastName, changeRole, role }) => {
  return (
    <div className={styles.notif_card}>
      <div>
        <h3>{username}</h3>
        <p>{firstName} {lastName}</p>
      </div>
      <button onClick={() => changeRole(id)}><FaUserPlus size={20} color="darkgreen" /></button>
    </div>
  );
};

export default NotificationCard;
