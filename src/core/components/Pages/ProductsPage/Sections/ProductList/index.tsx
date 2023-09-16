import React, { useEffect, useState } from 'react'

import styles from "../productsPageSections.module.scss";
import { calcPercent } from '../../../../../utils/calcPercent';

import { AiTwotoneStar } from "react-icons/ai";
import Text from '../../../../Text';
import { useSelector } from 'react-redux';
import { log } from 'util';

const Item = ({ obj }: { obj: any }) => {
  const [{ thumbnail, rating, price, discountPercentage, title, brand }] = useState<any>(obj);
  const [ratingStarEls, setRatingStarEls] = useState<any>([]);

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
        <img src={thumbnail} loading="lazy" alt={title} />
      </span>
      <div className={styles.productsBodyListItemBody}>
        <div>
          <Text tag='h3' fontWeight='medium'>{title}</Text>
        </div>
        <div className={styles.rating}>
          <span className={styles.ratingStars}>
            {ratingStarEls?.map((item: any, i: number) => <div key={i+'_star'}>{item} </div>)}
          </span>
          <Text >{calcPercent(4.631231234, 10, 1)}</Text>
        </div>
        <div>
          <Text tag='h3' fontWeight='medium'>brand: {brand} </Text><br/>
          <Text tag='h3' fontWeight='medium'>price: ${price} </Text>
        </div>
      </div>
    </li>
  )
}

const ProductList = () => {
  const { products, filteredProducts } = useSelector((state:any) => state);

  return (
    <ul className={styles.productsBodyList}>
      {
        filteredProducts?.map((item: any) => <Item key={item.id} obj={item} />)
      }
    </ul>
  )
}

export default ProductList;