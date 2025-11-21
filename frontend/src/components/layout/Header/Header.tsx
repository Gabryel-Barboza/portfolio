import clsx from 'clsx';
import { BsArrowUpRight } from 'react-icons/bs';

import styles from './Header.module.css';

interface Props {
  titleText: string;
  titleEmphasisText?: string;
  subtitle?: string;
  text?: string;
  buttonText?: string;
  mainVisibility?: boolean;
  onBtnClick?: (...args: unknown[]) => void;
  onMainToggle?: () => void;
}

const Header = ({
  titleText,
  titleEmphasisText,
  subtitle,
  text,
  buttonText,
  mainVisibility,
  onBtnClick,
  onMainToggle,
}: Props) => {
  const toggleButtonClass = clsx(styles.toggleButton, { [styles.toggled]: mainVisibility });

  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.titleText}>{titleText}</span> {titleEmphasisText}
      </h1>
      {(subtitle || text) && (
        <>
          <div className={styles.mainText}>
            <span className={styles.animatedText}>&#123;</span>
            <div>
              {subtitle && <h2>{subtitle}</h2>}
              {text && <p>{text}</p>}
            </div>
          </div>
        </>
      )}
      {buttonText && (
        <button type="button" onClick={onBtnClick}>
          {buttonText}{' '}
          <span>
            <BsArrowUpRight />
          </span>
        </button>
      )}
      {onMainToggle && (
        <button type="button" className={toggleButtonClass} onClick={onMainToggle}>
          {'>'}
        </button>
      )}
    </header>
  );
};

export default Header;
