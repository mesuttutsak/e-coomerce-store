import React, { useEffect, useState } from 'react'

import styles from "../productsPageSections.module.scss";
import { calcPercent } from '../../../../../utils/calcPercent';

import { AiTwotoneStar } from "react-icons/ai";
import { log } from 'console';
import Text from '../../../../Text';

const Item = ({ obj }: { obj: any }) => {
  const [{ thumbnail, rating, price, discountPercentage, title }] = useState<any>(obj)
  const [ratingStarEls, setRatingStarEls] = useState<any>([])

  useEffect(() => {
    let starELs = [];

    if (rating) {
      for (let i = 0; i < 10; i += 2) {
        if (i < rating) {
          starELs.push(<AiTwotoneStar key={i + title} color="orange" />);
        } else {
          starELs.push(<AiTwotoneStar key={i + title} color='#d3ccc5' />);
        }
      }
      setRatingStarEls(starELs)
    }

    return
  }, [rating]);


  return (
    <li className={styles.productsBodyListItem}>
      <span className={styles.productsBodyListItemImgTop}>
        <img src={thumbnail} />
      </span>
      <div className={styles.productsBodyListItemBody}>
        <div>
          <Text tag='h3' fontWeight='semibold'>${price} </Text> <Text fontSize='xs'>- %{discountPercentage}</Text>
        </div>
        <div className={styles.rating}>
          <span className={styles.ratingStars}>
            {ratingStarEls?.map((item: any, i: number) => <div key={i}>{item} </div>)}
          </span>
          <Text >{calcPercent(4.631231234, 10, 1)}</Text>
        </div>
        <div>
          <Text lineHeight='6'>{title}</Text>
        </div>
      </div>
    </li>
  )
}

const ProductList = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    fetch('https://dummyjson.com/products?limit=30')
      .then(res => res.json())
      .then(json => setData(json.products));

  }, [])
  return (
    <ul className={styles.productsBodyList}>
      {
        data?.map((item: any) => <Item key={item.id} obj={item} />)
      }
    </ul>
  )
}

export default ProductList;