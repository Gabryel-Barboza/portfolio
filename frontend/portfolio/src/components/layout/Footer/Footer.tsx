import reactLogo from '../../../assets/react.svg';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>
        <p>
          &copy; 2025
          <span className={styles.signature}>
            <a href="https://github.com/gabryel-barboza">Gabryel Barboza</a>
          </span>
        </p>
        <p>
          Desenvolvido com React
          <img className={styles.logo} alt="Logo React" src={reactLogo} />
        </p>
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            Favicon icon by{' '}
            <a href="https://icons8.com/" rel="noreferrer noopener">
              Icons8
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
