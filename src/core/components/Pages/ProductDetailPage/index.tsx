import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { getProductDetail } from '../../../services';

import MainLayout from '../../../layouts/MainLayout';
import ProductsDetailSections from './Sections';

const ProductDetailPage = () => {
  const { id }: any = useParams();

  const [data, setData] = useState<any>();

  useEffect(() => {
    getProductDetail(id).then((item: any) => setData(item)).catch(console.log);
  }, [id]);

  return (
    <MainLayout>
      <div className={'_container'} id={'productDetail'}>
        {data ?
          <ProductsDetailSections data={data} /> : <>loading...</>
        }
      </div>
    </MainLayout >
  )
}

export default ProductDetailPage;