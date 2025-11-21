import { MdEmail } from 'react-icons/md';
import { TbBrandLinkedin, TbBrandGithub } from 'react-icons/tb';

import type { SectionTitleSchema } from '../../schemas/layoutSchemas';
import styles from './Contacts.module.css';
import useHovering from '../../hooks/useHovering';
import useServerContext from '../../context/useServerContext';

type Props = SectionTitleSchema;

const Contacts = ({ id, pageStyles, titleIcon: TitleIcon, titleText }: Props) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();
  const { resume } = useServerContext();

  const titleClass = pageStyles
    ? isHovering
      ? pageStyles.titleMouseEnter
      : pageStyles.titleMouseLeave
    : '';

  return (
    resume && (
      <section id={id}>
        <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span>{<TitleIcon />}</span>
          {titleText}
        </h2>
        <div className={styles.contactCard}>
          <p>
            Quer entrar em contato? Utilize algum dos canais abaixo, onde geralmente estou ativo e
            posso me conectar com você!
          </p>
          <div>
            <button type="button">
              <a href={`mailto:${resume.contacts.email}`}>
                <MdEmail />
                Entrar em Contato
              </a>
            </button>
            <ul>
              <li>
                <a href={resume.contacts.linkedin} rel="external" target="_blank">
                  <TbBrandLinkedin />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={resume.contacts.github} rel="external" target="_blank">
                  <TbBrandGithub />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  );
};

export default Contacts;
