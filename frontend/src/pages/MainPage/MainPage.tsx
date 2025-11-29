import { useEffect, useRef, useState } from 'react';
import {
  BsBook,
  BsBriefcaseFill,
  BsCodeSlash,
  BsFileEarmarkPerson,
  BsFillHouseDoorFill,
} from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import styles from './MainPage.module.css';

import type { SectionSchema } from '../../schemas/layoutSchemas';

import Header from '../../components/layout/Header/Header';
import AboutMe from '../../components/AboutMe/AboutMe';
import Projects from '../../components/Projects/Projects';
import Skills from '../../components/Skills/Skills';
import Contacts from '../../components/Contacts/Contacts';
import NavBar from '../../components/layout/NavBar/NavBar';
import useServerContext from '../../context/useServerContext';
import Education from '../../components/Education/Education';

const SECTIONS: SectionSchema[] = [
  { id: 'root', text: 'Início', icon: BsFillHouseDoorFill },
  { id: 'about-me', text: 'Sobre Mim', icon: BsFileEarmarkPerson },
  { id: 'education', text: 'Educação', icon: BsBook },
  { id: 'projects', text: 'Projetos', icon: BsBriefcaseFill },
  { id: 'skills', text: 'Habilidades', icon: BsCodeSlash },
  { id: 'contacts', text: 'Contatos', icon: MdEmail },
];

const MainPage = () => {
  const projectSection = useRef<HTMLDivElement>(null);
  const [mainVisibility, setMainVisibility] = useState(false);
  const [scrollToProjects, setScrollToProjects] = useState(false);
  const { isLoading } = useServerContext();

  const toggleMainVisibility = () => {
    setMainVisibility(!mainVisibility);
    setScrollToProjects(false);
  };

  const handleViewProjectsClick = () => {
    if (!mainVisibility) {
      toggleMainVisibility();
      setScrollToProjects(true);
    }

    projectSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (mainVisibility && scrollToProjects)
      projectSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [mainVisibility, scrollToProjects]);

  return (
    <>
      <NavBar
        sections={SECTIONS}
        pageStyles={styles}
        mainVisibility={mainVisibility}
        onToggleMain={toggleMainVisibility}
      />

      <Header
        titleText="Olá, eu sou"
        titleEmphasisText="Gabryel Barboza."
        subtitle="Desenvolvedor Full-Stack | Criando Experiências Digitais"
        text="Sou um desenvolvedor apaixonado por construir soluções web escaláveis e intuitivas.
                Especializado em React e TypeScript para criar interfaces interativas e Python para serviços ou automações."
        buttonText="Ver meus projetos"
        mainVisibility={mainVisibility}
        onBtnClick={handleViewProjectsClick}
        onMainToggle={toggleMainVisibility}
      />
      {isLoading ? (
        <h2 className={styles.loading}>
          Carregando<span>.</span>
          <span>.</span>
          <span>.</span>
        </h2>
      ) : (
        mainVisibility && (
          <main className={styles.main}>
            <AboutMe
              id={SECTIONS[1].id}
              pageStyles={styles}
              titleIcon={SECTIONS[1].icon}
              titleText="Sobre Mim"
            />
            <Education
              id={SECTIONS[2].id}
              pageStyles={styles}
              titleIcon={SECTIONS[2].icon}
              titleText="Educação"
            />
            <Projects
              id={SECTIONS[3].id}
              pageStyles={styles}
              titleIcon={SECTIONS[3].icon}
              titleText="Projetos"
              ref={projectSection}
            />
            <Skills
              id={SECTIONS[4].id}
              pageStyles={styles}
              titleIcon={SECTIONS[4].icon}
              titleText="Habilidades"
            />
            <Contacts
              id={SECTIONS[5].id}
              pageStyles={styles}
              titleIcon={SECTIONS[5].icon}
              titleText="Contatos"
            />
          </main>
        )
      )}
    </>
  );
};

export default MainPage;
