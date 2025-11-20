import clsx from 'clsx';
import { useState } from 'react';

import { MdMenu } from 'react-icons/md';

import styles from './NavBar.module.css';
import useWindowSize from '../../../hooks/useWindowSize';
import type { SectionSchema } from '../../../schemas/layoutSchemas';

interface Props {
  sections: SectionSchema[];
  activeSection: SectionSchema;
}

const NavBar = ({ sections, activeSection }: Props) => {
  const { windowSize } = useWindowSize();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const isMobile = windowSize.width < 720;
  const navClass = clsx({
    [styles.nav]: !isMobile,
    [styles.mobileNav]: isMobile,
    [styles.navOpen]: isMobile && mobileMenuVisible,
  });

  const toggleMenuVisibility = () => setMobileMenuVisible(!mobileMenuVisible);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          &lt;<span>TS</span> / &gt;
        </div>

        {isMobile && (
          <button className={styles.menuBtn} onClick={toggleMenuVisibility} type="button">
            <MdMenu />
          </button>
        )}

        <div className={navClass}>
          <span className={styles.animatedText}>&#123;</span>
          <div className={styles.items}>
            <ul>
              {sections.map((section, idx) => {
                const isActiveSection = section.id === activeSection.id;
                const liClass = isActiveSection ? styles.activeSection : '';

                return (
                  <li
                    key={idx}
                    className={liClass}
                    onClick={isMobile ? toggleMenuVisibility : undefined}
                  >
                    <a href={`#${section.id}`}>
                      {<section.icon />}
                      {section.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
