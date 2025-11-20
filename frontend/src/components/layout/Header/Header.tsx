import { BsArrowUpRight } from 'react-icons/bs';

import styles from './Header.module.css';

interface Props {
  titleText: string;
  titleEmphasisText?: string;
  subtitle?: string;
  text?: string;
  buttonText?: string;
  onBtnClick?: (...args: unknown[]) => void;
}

const Header = ({
  titleText,
  titleEmphasisText,
  subtitle,
  text,
  buttonText,
  onBtnClick,
}: Props) => {
  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.titleText}>{titleText}</span> {titleEmphasisText}
      </h1>
      {(subtitle || text) && (
        <div className={styles.mainText}>
          <span className={styles.animatedText}>&#123;</span>
          <div>
            {subtitle && <h2>{subtitle}</h2>}
            {text && <p>{text}</p>}
          </div>
        </div>
      )}
      {buttonText && (
        <button type="button" onClick={onBtnClick}>
          {buttonText}{' '}
          <span>
            <BsArrowUpRight />
          </span>
        </button>
      )}
    </header>
  );
};

export default Header;
