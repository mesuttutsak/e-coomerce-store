import React, { useEffect, useState } from 'react'

import styles from "../productsPageSections.module.scss";
import { calcPercent } from '../../../../../utils/calcPercent';

import { AiTwotoneStar } from "react-icons/ai";
import Text from '../../../../Text';
import { useSelector } from 'react-redux';
import { log } from 'util';
import { NavLink } from 'react-router-dom';
import RatingStars from '../../../../RatingStars';

const Item = ({ obj }: { obj: any }) => {
  const [{ id, thumbnail, rating, price, title, brand }] = useState<any>(obj);

  return (
    <li className={styles.productsBodyListItem}>

      <NavLink to={`/detail/${id}`}>
        <span className={styles.productsBodyListItemImgTop}>
          <img src={thumbnail} loading="lazy" alt={title} />
        </span>
        <div className={styles.productsBodyListItemBody}>
          <div>
            <Text tag='h3' fontSize='md' fontWeight='semibold'>{title}</Text>
          </div>
          <div className={styles.rating}>
            <span className={styles.ratingStars}>
              <RatingStars rating={rating} />
            </span>
            <Text>({calcPercent(rating, 10)})</Text>
          </div>
          <div>
            <Text tag='h4' fontWeight='medium'>brand: {brand} </Text><br />
            <Text tag='h4' fontWeight='medium'>price: ${price} </Text>
          </div>
        </div>
      </NavLink>
    </li>
  )
}

const ProductList = () => {
  const { filteredProducts } = useSelector((state: any) => state);

  return (
    <ul className={styles.productsBodyList}>
      {
        filteredProducts?.map((item: any) => <Item key={item.id} obj={item} />)
      }
    </ul>
  )
}

export default ProductList;