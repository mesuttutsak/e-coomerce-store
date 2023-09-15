import { ReactNode } from 'react';
import { renderClasses } from '../../utils/renderClasses';

interface SectionProps {
    children: ReactNode;
    className?: string[];
    id?: string
}

const Section = ({children, className : customClass = [], id} : SectionProps) => {
  return (
    <section className={renderClasses([...customClass])}>{children}</section>
  )
}

export default Section