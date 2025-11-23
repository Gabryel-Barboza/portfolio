import clsx from 'clsx';
import { BsArrowUpRight } from 'react-icons/bs';

import styles from './Header.module.css';
import { useEffect, useRef } from 'react';
import useServerContext from '../../../context/useServerContext';

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
  const { resume } = useServerContext();
  const header = useRef<HTMLElement>(null);

  const toggleButtonClass = clsx(styles.toggleElement, { [styles.toggled]: mainVisibility });

  useEffect(() => {
    if (resume && header.current) {
      const imageUrl = resume.profilePicture;
      header.current.style.setProperty('--profilePicture', `url('${imageUrl}')`);
    }
  }, [resume]);

  return (
    <>
      <header className={styles.header} ref={header}>
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
          <div className={toggleButtonClass}>
            <button type="button" onClick={onMainToggle}>
              {'>'}
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
