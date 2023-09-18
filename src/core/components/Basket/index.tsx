
import { useDispatch, useSelector } from "react-redux"

import styles from "./basket.module.scss";

import Button from '../Button';

import { BasketItem } from "../../store/reducer";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiPlus, BiMinus } from "react-icons/bi";
import Text from "../Text";
import { useEffect, useState } from "react";
import { renderClasses } from "../../utils/renderClasses";
import { findBasketItemCount, uptBasketObject } from "../Pages/ProductDetailPage/Sections/DetailInfo";
import { NavLink, useNavigate } from "react-router-dom";

const Item = ({ item }: { item: BasketItem }) => {
    const dispatch = useDispatch();
    const { id, title, description, thumbnail, count } = item;

    const { basket } = useSelector((state: any) => state);

    const [itemCount, setItemCount] = useState<number>(count);

    function countOperation(action: 'incr' | 'decr') {

        if (action === "incr") {
            dispatch({ type: "setBasket", payload: uptBasketObject(basket, item, Number(id), 'inc') })
        } else if (action === "decr") {
            dispatch({ type: "setBasket", payload: uptBasketObject(basket, item, Number(id), 'dec') })
        }

    }

    useEffect(() => {
        setItemCount(findBasketItemCount(basket, Number(id)));
    }, [basket])

    return <li className={styles.basketListItem}>
        <div className={styles.basketListItemLeft}>
            <span className={styles.basketListItemLeftImg}>
                <img src={thumbnail} height={'50px'} width={'auto'} alt={title} />
            </span>
        </div>
        <div className={styles.basketListItemRight}>
            <div className={styles.basketListItemRightInfo}>

                <NavLink to={`/detail/${id}`}><div><Text fontWeight="semibold" fontSize="md" >{title}</Text></div></NavLink>
                <Text>{description}</Text>
            </div>
            <div className={styles.basketListItemRightCount}>
                <Button className={[styles.basketListItemRightCountBtn]} onClick={() => countOperation('incr')}>
                    <BiPlus />
                </Button>
                <input min={0} type="number" defaultValue={itemCount} value={itemCount} />
                <Button className={[styles.basketListItemRightCountBtn]} isDisabled={itemCount <= 0} onClick={() => countOperation('decr')}>
                    <BiMinus />
                </Button>
            </div>
        </div>
    </li >
}


const Basket = () => {
    const navigate = useNavigate();
    
    const { basket } = useSelector((state: any) => state);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function basketProductsLength(list: BasketItem[]) {
        let totalCount = 0;

        list.forEach(({ count }: BasketItem) => {
            totalCount += count;
        });

        return totalCount;
    }

    return (

        <div className={styles.basket}>
            <Button className={[styles.basketBtn]} onClick={() => setIsOpen(prevState => !prevState)}>
                <AiOutlineShoppingCart />
                {basket.length > 0 &&
                    <span className={styles.basketBtnCount}>
                        <Text>{basketProductsLength(basket)}</Text>
                    </span>
                }
            </Button>
            <div className={renderClasses([styles.basketContent, isOpen ? styles.open : ""])}>
                <div className={styles.basketContentWrap}>
                    {
                        basket.length > 0 ? <>
                            <ul className={styles.basketList}>
                                {basket.map((item: BasketItem, i: number) => <Item key={i + item.title} item={item} />)}
                            </ul></> : <> <NavLink to='/'>Buy Product</NavLink>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Basket;