import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { getProductDetail } from '../../../services';
import Text from '../../Text';

import { BsCheckLg } from "react-icons/bs";
import Button from '../../Button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BasketItem } from '../../../store/reducer';



export function findBasketItemCount(list: any[], id: number) {
  const detectItem = list.some((item) => item.id == id);
  const findIndex = list?.findIndex((item) => item.id == id);
  const findCount = detectItem ? list[findIndex]?.count : 0;
  return findCount;
}



export function uptBasketObject(list: any[], data: any, id: string, action: 'inc' | 'dic' | null) {
  let result = list;
  const detectItem = result.some((item) => item.id == id);
  const findIndex = result.findIndex((item) => item.id == id);

  const obj = {
    id: data.id,
    title: data.title,
    description: data.description,
    thumbnail: data.thumbnail,
    count: 1,
  }

  if (detectItem) {
    if (action == 'inc') {
      result[findIndex].count = result[findIndex].count + 1;
    } else if (action == 'dic') {
      if (result[findIndex].count == 1) {
        result.splice(result[findIndex], 1)
      } else {
        result[findIndex].count = result[findIndex].count - 1;
      }
    }
  } else {
    result.push(obj)
  }
  return [...result];
}

const ProductDetailPage = () => {
  const dispatch = useDispatch();

  const { basket } = useSelector((state: any) => state);

  const { id }: any = useParams();

  const [data, setData] = useState<any>();
  const [count, setCount] = useState<number>();

  useEffect(() => {
    getProductDetail(id).then((item: any) => setData(item)).catch(console.log);
  }, [id]);

  function buyProduct() {
    dispatch({ type: "setBasket", payload: uptBasketObject(basket, data, id, 'inc') })
  }

  useEffect(() => {
    setCount(findBasketItemCount(basket, id));
  }, [basket])

  return (
    <MainLayout>
      <div className={'_container'} id={'productDetail'}>
        {data ?
          <div className='wrapper flex flex-row gap-3'>
            <div className='left w-96'>
              <img src={data.thumbnail} alt={data.title} />
            </div>
            <div className='right w-96'>
              <div className='flex flex-row items-center mb-1 gap-2'>
                <Text fontWeight='bold' fontSize='xl'>{data.title}</Text>
                {data?.stock > 0 && <>
                  <Text className={['inline-flex flex-row items-s justify-start text-green-400']}><BsCheckLg className='inline-block' size={16} /> In stock</Text>
                </>}
              </div>
              <br />
              <ul>
                <li>
                  <Text fontWeight='semibold'>Category:</Text> <Text>{data.category}</Text> <br />
                </li>
                <li>
                  <Text fontWeight='semibold'>Description:</Text> <Text>{data.description}</Text> <br />
                </li>
                <li>
                  <Text fontWeight='semibold'>Price:</Text> <Text>{data.price}</Text> <br />
                </li>
                <li>
                  <Text fontWeight='semibold'>Rating:</Text> <Text>{data.rating}</Text> <br />
                </li>
                <li><Text fontWeight='semibold'>Brand:</Text> <Text>{data.brand}</Text> <br /></li>
              </ul>
              <div className='actions flex gap-3'>
                <Button onClick={() => buyProduct()}>Sepete ekle</Button>
                <div className='count'>
                  <input min={0} defaultValue={count} value={count} type='number' />
                </div>
              </div>
            </div>
          </div> : <>loading...</>
        }
      </div>
    </MainLayout >
  )
}

export default ProductDetailPage;