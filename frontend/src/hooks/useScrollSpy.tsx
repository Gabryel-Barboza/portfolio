import { useState, useEffect, useRef, useCallback } from 'react';
import type { SectionSchema } from '../schemas/layoutSchemas';

interface Options {
  topOffset: number;
  classStyle?: { enter: string; leave: string };
  childSelector?: string;
}

const getSectionIntersection = (
  section: SectionSchema,
  { topOffset, classStyle, childSelector }: Options
) => {
  const element = document.getElementById(section.id);
  let isIntersection = false;

  if (element) {
    // Recupera um objeto com a distância relativa a viewport do elemento (top viewport - top, top viewport - bottom, left viewport - left, ...)
    const rect = element.getBoundingClientRect();

    // Se a seção estiver visível na tela (topo da seção com distância menor ou igual ao offset do topo da viewport e o bottom maior que offset)
    isIntersection = rect.top <= topOffset && rect.bottom > topOffset ? true : false;

    if (classStyle) {
      if (!childSelector) return isIntersection;

      const sectionChild = element.querySelector<HTMLElement>(childSelector);

      if (sectionChild) {
        // Ativar ou desativar classes, (token, force?: se true tentar apenas adicionar classe, se false apenas remover)
        sectionChild.classList.toggle(classStyle.enter, isIntersection);
        sectionChild.classList.toggle(classStyle.leave, !isIntersection);
      }
    }
  }

  return isIntersection;
};

const useScrollSpy = (sections: SectionSchema[], options: Options) => {
  const [activeSection, setActiveSection] = useState<SectionSchema | undefined>(
    sections[0] ?? undefined
  );
  const timeoutId = useRef<number | undefined>(undefined);
  const sectionRef = useRef<SectionSchema | undefined>(sections[0] ?? undefined);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    clearTimeout(timeoutId.current);

    // Debouncing de scroll event
    timeoutId.current = setTimeout(() => {
      sections.forEach((section) => {
        const isIntersection = getSectionIntersection(section, options);

        // Se interseção e elemento diferente do atual
        if (isIntersection && sectionRef.current?.id !== section.id) {
          sectionRef.current = section;
          setActiveSection(section);

          return;
        }
      });
    }, 30);
  }, [sections, options]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { activeSection };
};

export default useScrollSpy;
