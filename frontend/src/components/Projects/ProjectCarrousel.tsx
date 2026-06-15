import { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import type { ProjectMediaSchema } from '../../schemas/dataSchemas';

import styles from './ProjectCarrousel.module.css';

interface Props {
  mediaList: ProjectMediaSchema[];
}

const ProjectCarrousel = ({ mediaList }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCarrouselBtn = (direction: 'left' | 'right') => {
    const step = direction === 'left' ? -1 : 1;

    setCurrentIndex((prev) => {
      return (prev + step + mediaList.length) % mediaList.length;
    });
  };

  return (
    <div className={styles.carrousel}>
      <div
        className={styles.carrouselTrack}
        style={{ transform: `translateX(-${currentIndex * 101}%)` }}
      >
        {mediaList.map((media, idx) => (
          <div className={styles.slide} key={idx}>
            {media.type == 'video' ? (
              <video
                className={styles.mediaElement}
                src={media.url}
                muted
                playsInline
                loop
                preload="none"
              >
                {media.altText}
              </video>
            ) : (
              <img
                className={styles.mediaElement}
                src={media.url}
                alt={media.altText}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
      <button
        className={`${styles.carrouselBtn} ${styles.btnPrev}`}
        onClick={() => handleCarrouselBtn('left')}
        type="button"
        aria-label="Imagem anterior"
      >
        <BsArrowLeft />
      </button>
      <button
        className={`${styles.carrouselBtn} ${styles.btnNext}`}
        onClick={() => handleCarrouselBtn('right')}
        type="button"
        aria-label="Próxima imagem"
      >
        <BsArrowRight />
      </button>
    </div>
  );
};

export default ProjectCarrousel;
