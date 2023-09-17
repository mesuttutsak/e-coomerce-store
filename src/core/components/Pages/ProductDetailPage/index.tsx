import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { getProductDetail } from '../../../services';

const ProductDetailPage = () => {

  const { id }: any = useParams();

  useEffect(() => {
    getProductDetail(id).then(console.log)
  }, [])


  return (
    <MainLayout>
      <div className={'_conatiner'} id={'productDetail'}>
        {id}
      </div>
    </MainLayout>
  )
}

export default ProductDetailPage;