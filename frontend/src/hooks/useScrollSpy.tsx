import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { SectionSchema } from '../schemas/layoutSchemas';

const getSectionIntersection = (section: SectionSchema, offset: number) => {
  const element = document.getElementById(section.id);

  if (element) {
    // Recupera um objeto com a distância relativa a viewport do elemento (top viewport - top, top viewport - bottom, left viewport - left, ...)
    const rect = element.getBoundingClientRect();

    // Se a seção estiver visível na tela (topo da seção com distância menor ou igual ao offset do topo da viewport e o bottom maior que offset)
    return rect.top <= offset && rect.bottom > offset ? true : false;
  }
};

const useScrollSpy = (sections: SectionSchema[], topOffset: number = 150) => {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const timeoutId = useRef<number | undefined>(undefined);
  const sectionRef = useRef<SectionSchema>(sections[0]);
  const offset = useMemo(() => topOffset, [topOffset]);

  const handleScroll = useCallback(() => {
    clearTimeout(timeoutId.current);

    // Debouncing de scroll event
    timeoutId.current = setTimeout(() => {
      sections.forEach((section) => {
        const isIntersection = getSectionIntersection(section, offset);

        // Se interseção e elemento diferente do atual
        if (isIntersection && section.id !== sectionRef.current.id) {
          sectionRef.current = section;
          setActiveSection(section);
        }
      });
    }, 30);
  }, [offset, sections]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { activeSection };
};

export default useScrollSpy;
