
import { useDispatch, useSelector } from "react-redux"

import styles from "./basket.module.scss";

import Button from '../Button';

import { BasketItem } from "../../store/reducer";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiPlus, BiMinus } from "react-icons/bi";
import Text from "../Text";
import { useEffect, useState } from "react";
import { renderClasses } from "../../utils/renderClasses";

const Item = ({ item }: { item: BasketItem }) => {
    const { title, desc, thumbnail, count } = item;

    function countOperation (action: 'incr' | 'decr') {

        if (action === "incr") {
            alert(`${title} arttırıldı`)
        } else if (action === "decr") {
            alert(`${title} azaltıldı`)
        }
        
    }
    
    return <li className={styles.basketListItem}>
        <div className={styles.basketListItemLeft}>
            <span className={styles.basketListItemLeftImg}>
                <img src={thumbnail} height={'50px'} width={'auto'} alt={title} />
            </span>
        </div>
        <div className={styles.basketListItemRight}>
            <div className={styles.basketListItemRightInfo}>
                <div><Text fontWeight="semibold" fontSize="md" >{title}</Text></div>
                <Text>{desc}</Text>
            </div>
            <div className={styles.basketListItemRightCount}>
                <Button  className={[styles.basketListItemRightCountBtn]} onClick={() => countOperation('incr')}>
                    <BiPlus />
                </Button>
                <input min={0} type="number" defaultValue={count} />
                <Button className={[styles.basketListItemRightCountBtn]} onClick={() => countOperation('decr')}>
                    <BiMinus />
                </Button>
            </div>
        </div>
    </li>
}


const Basket = () => {
    const dispatch = useDispatch();

    const { basket } = useSelector((state: any) => state);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (

        <div className={styles.basket}>
            <Button className={[styles.basketBtn]} onClick={() => setIsOpen(prevState => !prevState)}>
                <AiOutlineShoppingCart />
                {basket.length > 0 &&
                    <span className={styles.basketBtnCount}>
                        <Text>{basket.length}</Text>
                    </span>
                }
            </Button>
            <div className={renderClasses([styles.basketContent, isOpen ? styles.open : ""])}>
                <div className={styles.basketContentWrap}>
                    <ul className={styles.basketList}>
                        {basket.map((item: BasketItem, i:number) => <Item key={i+item.title} item={item} />)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Basket;