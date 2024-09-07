import { Link, useLocation } from 'react-router-dom';
import styles from './GoBackBtn.module.css';

export const GoBackBtn = () => {
  const location = useLocation();
  const backLink = location.state ?? '/';

  return (
    <Link to={backLink} className={styles.link}>
      Go back
    </Link>
  );
};
