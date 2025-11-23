import clsx from 'clsx';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdMenu } from 'react-icons/md';

import type { SectionSchema } from '../../../schemas/layoutSchemas';

import styles from './NavBar.module.css';
import useWindowSize from '../../../hooks/useWindowSize';
import useScrollSpy from '../../../hooks/useScrollSpy';

interface Props {
  sections: SectionSchema[];
  pageStyles: CSSModuleClasses;
  mainVisibility: boolean;
  onToggleMain: () => void;
}

const NavBar = ({ sections, pageStyles, mainVisibility, onToggleMain }: Props) => {
  const { windowSize } = useWindowSize();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const isMobile = windowSize.width < 720;
  const [idToScroll, setIdToScroll] = useState<string | undefined>(undefined);

  const options = useMemo(
    () => ({
      topOffset: 250,
      classStyle: { enter: pageStyles.titleMouseEnter, leave: pageStyles.titleMouseLeave },
      childSelector: 'h2',
    }),
    [pageStyles]
  );

  const { activeSection } = useScrollSpy(sections, options);

  const navClass = clsx({
    [styles.nav]: !isMobile,
    [styles.mobileNav]: isMobile,
    [styles.navOpen]: isMobile && mobileMenuVisible,
  });

  const toggleMenuVisibility = useCallback(
    () => setMobileMenuVisible(!mobileMenuVisible),
    [mobileMenuVisible]
  );

  const handleItemClick = useCallback(
    (id: string) => {
      if (isMobile) toggleMenuVisibility();
      if (!mainVisibility) onToggleMain();

      setIdToScroll(id);
    },
    [isMobile, mainVisibility, toggleMenuVisibility, onToggleMain]
  );

  useEffect(() => {
    if (idToScroll) {
      const element = document.getElementById(idToScroll);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [idToScroll]);

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
                const isActiveSection = activeSection?.id === section.id;
                const liClass = isActiveSection ? styles.activeSection : '';

                return (
                  <li key={idx} className={liClass}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(section.id);
                      }}
                      href={`#${section.id}`}
                    >
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
