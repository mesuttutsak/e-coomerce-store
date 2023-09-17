import { ReactNode, useState } from 'react';

import Text from '../Text'

import styles from "./dropdown.module.scss";
import { renderClasses } from '../../utils/renderClasses';
import Button from '../Button';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface DropdownProps {
    children: ReactNode;
    className?: string[]
    title: string;
    isOpen?: boolean;
    showMore?: boolean;
}

const Dropdown = ({ children, className: customClassname = [], title, isOpen = true, showMore = true }: DropdownProps) => {
    const [isMore, setIsMore] = useState<boolean>(true);

    return (
        <div
            className={renderClasses([
                styles.dropdown,
                ...customClassname,
            ])}>
            <label htmlFor={'_DBControl' + title} className={styles.dropdownHeading}>
                <Text tag='h3' lineHeight='5' fontWeight={'semibold'}>{title}</Text>
            </label>
            <input id={'_DBControl' + title} name='dropdownControl' defaultChecked={isOpen} type='checkbox' />
            <div className={styles.dropdownHeadingInspector}></div>
            <div className={renderClasses([styles.dropdownBody, isMore ? styles.more : ''])}>
                {children}
            </div>
            {
                showMore &&
                <div className={styles.dropdownFooter}>
                    <Button onClick={() => setIsMore(!isMore)}>{isMore ? <BiChevronDown /> : <BiChevronUp />}</Button>
                </div>
            }
        </div>
    )
}

export default Dropdown