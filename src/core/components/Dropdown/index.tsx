import { ReactNode } from 'react';

import Text from '../Text'

import styles from "./dropdown.module.scss";

interface DropdownProps {
    children: ReactNode;
    title: string;
    isOpen?: boolean;
}

const Dropdown = ({ children, title, isOpen = true }: DropdownProps) => {

    return (
        <div className={styles.dropdown}>
            <label htmlFor={'_DBControl'+title} className={styles.dropdownHeading}>
                <Text tag='h3' lineHeight='5' fontWeight={'semibold'}>{title}</Text>
            </label>
            <input id={'_DBControl'+title} name='dropdownControl' defaultChecked={isOpen} type='checkbox'/>
            <div className={styles.dropdownBody}>
                {children}
            </div>
        </div>
    )
}

export default Dropdown