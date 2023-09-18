import React, { useEffect, useState } from 'react'

import styles from "../productsPageSections.module.scss";
import { calcPercent } from '../../../../../utils/calcPercent';

import { AiTwotoneStar } from "react-icons/ai";
import Text from '../../../../Text';
import { useSelector } from 'react-redux';
import { log } from 'util';
import { NavLink } from 'react-router-dom';
import RatingStars from '../../../../RatingStars';
import Button from '../../../../Button';
import Alert from '../../../../Alert';

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
            <Text tag='h3' fontSize='' fontWeight='semibold'>{title}</Text>
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
  const { filteredProducts, products, productsLoading } = useSelector((state: any) => state);
  const [showLimit, setShowLimit] = useState(15);

  return (<>
    {!productsLoading ?
      products.length === 0 ? <Alert>No product found as a result of the search.</Alert> :
      products.length > 0 && filteredProducts.length === 0 ? <Alert>No filtered product found.</Alert> :
      <ul className={styles.productsBodyList} >
        {
          filteredProducts?.slice(0, showLimit).map((item: any) => <Item key={item.id} obj={item} />)
        }

        {filteredProducts.length > showLimit && <div className={styles.productsBodyListShowMore}> <Button className={[styles.productsBodyListShowMoreBtn]} onClick={() => setShowLimit(prevState => prevState += 15)}>Show More</Button> </div>}
      </ul> : <>loading list...</>
    }
  </>
  )
}

export default ProductList;