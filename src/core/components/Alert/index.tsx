import React from 'react';


import styles from "./alert.module.scss";
import { renderClasses } from '../../utils/renderClasses';

interface StateProps {
  children: React.ReactNode
  theme?: string;
  className?: string[];
}

const Alert = ({ children, theme = '', className : customClass = [] }: StateProps) => {
  return (
    <div className={renderClasses([styles.alert, theme ? styles[theme] : '', ...customClass])}>
        {children}
    </div>
  )
};

export default Alert;