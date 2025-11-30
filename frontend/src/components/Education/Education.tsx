import { TbSchool, TbCertificate } from 'react-icons/tb';

import type { SectionTitleSchema } from '../../schemas/layoutSchemas';

import styles from './Education.module.css';
import useServerContext from '../../context/useServerContext';
import useHovering from '../../hooks/useHovering';
import type { CourseSchema } from '../../schemas/dataSchemas';

type Props = SectionTitleSchema;

const Education = ({ id, pageStyles, titleIcon: TitleIcon, titleText }: Props) => {
  const { resume } = useServerContext();
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();

  const titleClass = pageStyles
    ? isHovering
      ? pageStyles.titleMouseEnter
      : pageStyles.titleMouseLeave
    : '';

  const getCourseCertificates = (course: CourseSchema) => {
    const certificates = course.certificates.map((certificate, idx) => {
      const certificateId = certificate.split('id=')[1];
      const certificateUrl = `https://drive.google.com/thumbnail?id=${certificateId}`;

      return (
        <a key={idx} className={styles.certificate} href={certificate} target="_blank">
          <img src={certificateUrl} alt={`Certificado para ${course.name}`} />
        </a>
      );
    });

    return certificates;
  };

  return (
    <section id={id} className={styles.education}>
      <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {resume ? (
          <>
            <span>{<TitleIcon />}</span>
            {titleText}
          </>
        ) : (
          <span>Não foi possível recuperar as formações do repositório</span>
        )}
      </h2>
      {resume && (
        <div className={styles.educationCard}>
          <h3>Formação Acadêmica</h3>
          {resume.education.degrees.map((degree) => (
            <div>
              <p className={styles.institute}>
                {' '}
                <TbSchool /> {degree.college}
              </p>
              <p className={styles.course}>{degree.course}</p>
              {degree.date && <span className={styles.date}>{degree.date}</span>}
            </div>
          ))}

          <h3>Cursos e Qualificações</h3>
          {resume.education.courses.map((course) => (
            <div key={course.name}>
              <p className={styles.course}>
                <TbCertificate />
                {course.name}{' '}
                {course.workload && <span className={styles.workload}>{course.workload}</span>}
              </p>
              <p className={styles.institute}>{course.institute}</p>
              {course.certificates.length > 0 && getCourseCertificates(course)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Education;
