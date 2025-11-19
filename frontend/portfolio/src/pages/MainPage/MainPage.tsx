import { useState, useEffect, useRef } from 'react';
import {
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

const SECTIONS: SectionSchema[] = [
  { id: 'root', text: 'Início', icon: BsFillHouseDoorFill },
  { id: 'about-me', text: 'Sobre Mim', icon: BsFileEarmarkPerson },
  { id: 'projects', text: 'Projetos', icon: BsBriefcaseFill },
  { id: 'skills', text: 'Habilidades', icon: BsCodeSlash },
  { id: 'contacts', text: 'Contatos', icon: MdEmail },
];

const MainPage = () => {
  const projects = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  useEffect(() => {
    let currentActiveSection = SECTIONS[0];
    // Criando efeito para scroll da página, um mecanismo scroll spy
    // No scroll, verifica qual a section atual e atualiza o estilo
    const handleScroll = () => {
      const offset = 150;

      // Para cada section disponível, se essa section estiver visível na tela (posicionada entre o offset e o fim da tela)
      SECTIONS.forEach((section) => {
        const element = document.getElementById(section.id);

        if (element) {
          const rect = element.getBoundingClientRect();

          // rect é um objeto com as propriedades de top, left, ... que refletem a distância do elemento em relação ao viewport. Seus valores indicam a distância do elemento em relação ao topo da viewport (top, bottom) ou as laterais (left, right).
          // Se top for próximo de 0 bottom maior que offset, então o elemento está visível e no topo da tela, logo é a section ativa.
          if (rect.top <= offset && rect.bottom > offset) {
            currentActiveSection = section;
          }
        }
      });

      if (currentActiveSection.id !== activeSection.id) setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleViewProjectsClick = () =>
    projects.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <NavBar sections={SECTIONS} activeSection={activeSection} />

      <Header
        titleText="Olá, eu sou"
        titleEmphasisText="Gabryel Barboza."
        subtitle="Desenvolvedor Full-Stack | Criando Experiências Digitais"
        text="Sou um desenvolvedor apaixonado por construir soluções web escaláveis e intuitivas.
                Especializado em React e TypeScript para criar interfaces interativas e Python para serviços ou automações."
        buttonText="Ver meus projetos"
        onBtnClick={handleViewProjectsClick}
      />
      <main className={styles.main}>
        <AboutMe
          pageStyles={styles}
          titleIcon={BsFileEarmarkPerson}
          titleText="Sobre Mim"
          sectionText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est illum eligendi quam amet aliquam provident id, expedita vitae doloribus voluptates, tenetur, dignissimos non eveniet repudiandae eaque adipisci magni! Consequatur, ipsam!"
        />
        <Projects
          pageStyles={styles}
          titleIcon={BsBriefcaseFill}
          titleText="Projetos"
          ref={projects}
        />
        <Skills pageStyles={styles} titleIcon={BsCodeSlash} titleText="Habilidades" />
        <Contacts pageStyles={styles} titleIcon={MdEmail} titleText="Contatos" />
      </main>
    </>
  );
};

export default MainPage;
