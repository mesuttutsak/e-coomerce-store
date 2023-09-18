import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../../../../Text'
import Button from '../../../../Button';

import styles from "../productsPageDetailSections.module.scss";
import RatingStars from '../../../../RatingStars';
import { BiMinus, BiPlus } from 'react-icons/bi';

function inputControl(target:any, currentCount:number,stock:number,) {;
    const value = target.value;
    const valToStr = value?.toString();
    const regex = /^[0-9]*$/;
    
    if (!regex.test(valToStr)) {
        target.value = currentCount?.toString();
        return false;
    } else if (Number(stock) < Number(value)) {
        target.value = stock?.toString();
        return false;
    }
    target.value = valToStr;
    return true;
}

export function uptBasketObject(list: any[], data: any, id: number, action: 'inc' | 'dec' | 'change', changeCount?: number) {
    let result = list;
    const detectItem = result.some((item) => item.id === id);
    const findIndex = result.findIndex((item) => item.id === id)
    
    const obj = {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        count: 1,
    }

    if (detectItem) {
        if (action === 'inc') {
            result[findIndex].count = result[findIndex].count + 1;
        } else if (action === 'dec') {

            if (result[findIndex].count === 1) result.splice(result[findIndex], 1);
            else { result[findIndex].count = result[findIndex].count - 1; }
            
            
        } else if (action === 'change') {
            if (typeof changeCount == 'number' && changeCount <= 0) {
                result.splice(result[findIndex], 1)
            }
            else result[findIndex].count = changeCount;
        }
    } else {
        result.push(obj)
    }

    return [...result];
}

export function findBasketItemCount(list: any[], id: number) {
    const detectItem = list.some((item) => item.id === id);
    const findIndex = list?.findIndex((item) => item.id === id);
    const findCount = detectItem ? list[findIndex]?.count : 0;
    return findCount;
}

const Headline = ({ data }: { data: any }) => {
    return (
        <div className={styles.detailInfoHeadline}>
            <div className={styles.detailInfoHeadlineTop}>
                <Text fontWeight='bold' fontSize='xl'>{data.title}</Text>
                {
                    data?.stock > 0 && <>
                        <Text className={[styles.detailInfoHeadlineTitle]}>({data.stock}) In stock</Text>
                    </>
                }
            </div>
            <div className={styles.detailInfoHeadlineBottom}>
                <RatingStars rating={data.rating} /><Text> ({data.rating})</Text>
            </div>
        </div>
    )
}

const InfoList = ({ data }: { data: any }) => {
    const listConfig = {
        Category: data.category,
        Description: data.description,
        Price: data.price,
        Rating: data.rating,
        Brand: data.brand
    }

    const createListEls = (list: any) => {
        const infoListEls = [];
        for (const obj in list) {
            infoListEls.push(<li key={obj + 'infoListEls'}><Text fontWeight='semibold'>{obj}:</Text> <Text>{list[obj]}</Text></li>)
        }

        return infoListEls;
    }

    return (
        <ul>
            {createListEls(listConfig)}
        </ul>
    )
}

const InfoActions = ({ data }: { data: any }) => {
    const { id }: any = useParams();
    const dispatch = useDispatch();
    const { basket } = useSelector((state: any) => state);

    const [count, setCount] = useState<number>(0);

    function incDecInBasket(action: `inc` | 'dec' | 'change', productCount?: number) {
        dispatch({ type: "setBasket", payload: uptBasketObject(basket, data, Number(id), action, productCount) })
    }

    useEffect(() => {
        setCount(findBasketItemCount(basket, Number(id)));
    }, [basket]);

    return (
        <div className={styles.detailInfoActions}>
            <Button className={[styles.detailInfoActionsBuy]} onClick={() => incDecInBasket('inc')}>Sepete ekle</Button>
            <div className={styles.detailInfoActionsCount}>
                <Button className={[styles.detailInfoActionsCountBtn]} isDisabled={Number(count) === data.stock} onClick={() => incDecInBasket('inc')}>
                    <BiPlus size={16} />
                </Button>
                <input min={0} max={data.stock} type="text" value={count?.toString()} onChange={(e: any) => { inputControl(e.target, count, data.stock);  return incDecInBasket('change', Number(e.target.value)); }} />
                <Button className={[styles.detailInfoActionsCountBtn]} isDisabled={Number(count) <= 0} onClick={() => { incDecInBasket('dec') }}>
                    <BiMinus size={16} />
                </Button>
            </div>
        </div>
    )
}

const DetailInfo = ({ data }: { data: any }) => {
    return (

        <div className={styles.detailInfo}>
            <Headline data={data} />
            <InfoList data={data} />
            <InfoActions data={data} />
        </div>
    )
}

export default DetailInfo