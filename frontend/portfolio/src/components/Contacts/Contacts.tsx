import { MdEmail } from 'react-icons/md';
import { TbBrandLinkedin, TbBrandGithub } from 'react-icons/tb';

import type { SectionTitleSchema } from '../../schemas/layoutSchemas';
import styles from './Contacts.module.css';
import useHovering from '../../hooks/useHovering';

type Props = SectionTitleSchema;

const Contacts = ({ pageStyles, titleIcon: TitleIcon, titleText }: Props) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();

  const titleClass = pageStyles
    ? isHovering
      ? pageStyles.titleMouseEnter
      : pageStyles.titleMouseLeave
    : '';

  return (
    <section id="contacts">
      <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <span>{<TitleIcon />}</span>
        {titleText}
      </h2>
      <div className={styles.contactCard}>
        <p>
          Quer entrar em contato? Utilize algum dos canais abaixo, onde estou sempre ativo e
          poderemos conversar.
        </p>
        <div>
          <button type="button">
            <a href="mailto:#">
              <MdEmail />
              Entrar em Contato
            </a>
          </button>
          <ul>
            <li>
              <a href="" rel="external">
                <TbBrandLinkedin />
                LinkedIn
              </a>
            </li>
            <li>
              <a href="" rel="external">
                <TbBrandGithub />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
